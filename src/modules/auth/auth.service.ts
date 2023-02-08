import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as chalk from 'chalk';
import { Result } from '../../common/common/dto/result.dto';
import { ErrorCode } from '../../common/exception/error.code';
import { encryptPassword } from '../../common/utils/cryptogram.util';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    console.log(chalk.red('JWT验证 - Step 2: 校验用户信息'));
    const user = await this.usersService.findOneByName(username, 1);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.passwordSalt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: User) {
    const payload = {
      username: user.userName,
      id: user.id,
      realName: user.realName,
      roleId: user.roleId,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return new Result().ok({ token });
    } catch (error) {
      return new Result().error(
        new ErrorCode().ACCOUNT_PASSWORD_ERROR,
        `账号或密码不正确`,
      );
    }
  }
}
