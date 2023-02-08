import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseDTO } from '../../../common/common/dto/base.dto';

export class CreateUserDto extends BaseDTO {
  @ApiProperty({ description: '用户名', example: '用户' })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @ApiProperty({ description: '真实姓名' })
  realName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;

  @ApiProperty({ description: '再次输入密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  repassword: string;

  @ApiProperty({ description: '性别 0：男 1：女 2：保密' })
  @IsEnum([0, 1], {
    message: 'gender只能传入0或1',
  })
  @Type(() => Number) //如果传递的是string类型，不报错，自动转成number类型
  gender: number;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '部门ID' })
  deptId: number;

  @ApiProperty({ description: '角色ID' })
  roleId: number;

  @ApiProperty({ description: '状态: 0启用 1禁用' })
  @IsEnum([0, 1], {
    message: 'status只能传入0或1',
  })
  @Type(() => Number) //如果传递的是string类型，不报错，自动转成number类型
  status: number;
}
