import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ description: '用户名', example: 'garland123' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly userName: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
