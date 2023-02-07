import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ description: '用户名' })
  userName: string;

  @ApiProperty({ description: '密码' })
  password: string;
}
