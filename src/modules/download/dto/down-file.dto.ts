import { ApiProperty } from '@nestjs/swagger';

export class getFileManageDto {
  @ApiProperty({ description: '文件uid', required: true })
  uid: string;
}
