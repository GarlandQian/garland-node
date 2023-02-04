import { Injectable } from '@nestjs/common';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';

@Injectable()
export class UserinfoService {
  create(createUserinfoDto: CreateUserinfoDto) {
    return 'This action adds a new userinfo';
  }

  findAll() {
    return `This action returns all userinfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userinfo`;
  }

  update(id: number, updateUserinfoDto: UpdateUserinfoDto) {
    return `This action updates a #${id} userinfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} userinfo`;
  }
}
