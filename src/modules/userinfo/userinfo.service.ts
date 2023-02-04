import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from 'src/common/utils/index.util';
import { Not, Repository } from 'typeorm';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { ListUserInfoDto } from './dto/list-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { Userinfo } from './entities/userinfo.entity';

@Injectable()
export class UserinfoService {
  constructor(
    @InjectRepository(Userinfo)
    private userInfoRepository: Repository<Userinfo>,
  ) {}

  async create(createUserinfoDto: CreateUserinfoDto) {
    createUserinfoDto.createTime = createUserinfoDto.updateTime =
      new Date().toTimeString();
    createUserinfoDto.isEnable = 0;
    return await this.userInfoRepository.save(createUserinfoDto);
  }

  // 查询分页
  async findAll(params): Promise<ListUserInfoDto> {
    const { page = 1, pageSize = 10 } = params;
    const getList = this.userInfoRepository
      .createQueryBuilder('user')
      .where({ isEnable: 0 })
      .orderBy({
        'user.updateTime': 'DESC',
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }

  async findOne(id: number): Promise<Userinfo> {
    return await this.userInfoRepository.findOne(id);
  }

  // 根据id或id和userName查询信息
  async findByName(username: string, id?: number): Promise<Userinfo> {
    const condition = { username };
    if (id) {
      condition['id'] = Not(id);
    }
    return await this.userInfoRepository.findOne(condition);
  }

  async update(id: number, updateUserinfoDto: UpdateUserinfoDto) {
    updateUserinfoDto.updateTime = new Date().toTimeString();
    return await this.userInfoRepository.update(id, updateUserinfoDto);
  }

  async remove(id: number) {
    return await this.userInfoRepository.delete(id);
  }
}
