import { PartialType } from '@nestjs/swagger';
import { CreateUserinfoDto } from './create-userinfo.dto';

export class UpdateUserinfoDto extends PartialType(CreateUserinfoDto) {
  id: number;
}
