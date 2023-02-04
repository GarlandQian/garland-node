import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from 'src/common/common/dto/pagination.dto';

export class ListUserInfoDto extends PartialType(PaginationDTO) {
  @ApiProperty({ description: '用户名', required: false })
  username?: string;
}
