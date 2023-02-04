import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/common/dto/result.dto';
import { ErrorCode } from 'src/common/exception/error.code';
import { ListUserInfoDto } from './dto/list-userinfo.dto';

@Controller('userinfo')
@ApiTags('用户管理')
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @Post()
  @ApiOperation({ summary: '新增用户信息' })
  async create(@Body() createUserinfoDto: CreateUserinfoDto) {
    const user = this.userinfoService.findByName(CreateUserinfoDto.name);
    if (user) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        '用户名已存在',
      );
    }
    return this.userinfoService.create(createUserinfoDto);
  }

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  async findAll(@Query() listUserDto: ListUserInfoDto) {
    const userList = await this.userinfoService.findAll(listUserDto);
    return new Result<UpdateUserinfoDto>().ok(userList);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userinfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserinfoDto: UpdateUserinfoDto,
  ) {
    return this.userinfoService.update(+id, updateUserinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userinfoService.remove(+id);
  }
}
