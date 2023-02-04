import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/common/dto/base.dto';

export class CreateUserDto extends BaseDTO {
  @ApiProperty({ description: '用户名', example: '用户' })
  userName: string;

  @ApiProperty({ description: '真实姓名' })
  realName: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '性别 0：男 1：女 2：保密' })
  gender: number;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '部门ID' })
  deptId: string;

  @ApiProperty({ description: '状态: 0启用 1禁用' })
  status: number;
}
