import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListUserDto } from './dto/list-user.dto';
import { Result } from 'src/common/common/dto/result.dto';
import { ErrorCode } from '../../common/exception/error.code';
import { AuthService } from '../auth/auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
@ApiTags('用户管理')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: '新增用户信息' })
  async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.repassword) {
      return new Result().error(
        new ErrorCode().ACCOUNT_PASSWORD_ERROR,
        '两次密码输入不一致',
      );
    }
    const user = await this.usersService.findOneByName(createUserDto.userName);
    if (user) {
      return new Result().error(new ErrorCode().ACCOUNT_EXIST, '用户已存在');
    }
    await this.usersService.create(createUserDto);
    return new Result().ok();
  }

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  async findAll(@Query() listUserDto: ListUserDto) {
    const userList = await this.usersService.findAll(listUserDto);
    return new Result<UpdateUserDto>().ok(userList);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户信息' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new Result<UpdateUserDto>().ok(user);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改用户信息' })
  async update(@Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.findByName(
      updateUserDto.userName,
      updateUserDto.id + '',
    );
    if (user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '用户名已存在',
      );
    }
    await this.usersService.update(updateUserDto);
    return new Result().ok();
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户信息' })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '用户不存在',
      );
    }
    user.delFlag = 1;
    console.log(user);
    await this.usersService.update(user);
    return new Result().ok();
  }

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginParmas: UserLoginDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.userName,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
