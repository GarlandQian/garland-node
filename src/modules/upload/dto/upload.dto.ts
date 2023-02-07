import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateFileManageDto {
  @ApiProperty({ description: '文件名称', example: '测试文件名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '文件大小', example: '13KB' })
  @IsString()
  size: string;
  // 这里
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
