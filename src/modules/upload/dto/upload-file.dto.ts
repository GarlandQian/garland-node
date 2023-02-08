import { ApiProperty } from '@nestjs/swagger';
export class CreateFileManageDto {
  // 这里
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
