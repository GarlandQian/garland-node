import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as chalk from 'chalk';
import { Result } from '../../common/common/dto/result.dto';
import { ErrorCode } from '../../common/exception/error.code';
import { Public } from '../../common/decorator/public.decorator';
import { AuthService } from '../auth/auth.service';
import { UserLoginDto } from '../users/dto/user-login.dto';

@Controller('login')
@Public()
@ApiTags('登录')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post()
  @ApiBody({
    description: '用户登录',
    type: UserLoginDto,
  })
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginParmas: UserLoginDto) {
    console.log(chalk.red('JWT验证 - Step 1: 用户请求登录'));
    const authResult = await this.authService.validateUser(
      loginParmas.userName,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return new Result().error(
          new ErrorCode().ACCOUNT_PASSWORD_ERROR,
          `账号或密码不正确`,
        );
      default:
        return new Result().error(
          new ErrorCode().ACCOUNT_NOT_EXIST,
          `查无此人`,
        );
    }
  }
}
