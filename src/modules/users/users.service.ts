import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPagination } from 'src/common/utils/index.util';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { sourceToTarget } from 'src/common/utils/convert.utils';
import { encryptPassword, makeSalt } from 'src/common/utils/cryptogram.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 新增
  async create(createUserDto: CreateUserDto): Promise<any> {
    const {
      userName,
      realName,
      password,
      gender,
      email,
      mobile,
      deptId,
      status = 0,
    } = createUserDto;

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码

    const createSql = this.usersRepository
      .createQueryBuilder()
      .insert()
      .values({
        userName,
        realName,
        password,
        passwordSalt: hashPwd,
        gender,
        email,
        mobile,
        deptId,
        status,
      });

    await createSql;
  }

  // 查询分页
  async findAll(params): Promise<ListUserDto> {
    const { page = 1, pageSize = 10 } = params;
    const getList = this.usersRepository
      .createQueryBuilder('user')
      .where({ delFlag: 0 })
      .orderBy({
        'user.update_time': 'DESC',
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

  // 根据id查询信息
  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  // 根据id或id和userName查询信息
  async findByName(userName: string, id: string): Promise<User> {
    const condition = { userName: userName };
    if (id) {
      condition['id'] = Not(id);
    }
    return await this.usersRepository.findOne(condition);
  }

  // 更新
  async update(updateUserDto: UpdateUserDto): Promise<void> {
    const user = sourceToTarget(updateUserDto, new UpdateUserDto());
    await this.usersRepository.update(user.id, user);
  }

  async findOneByName(userName: string): Promise<User> {
    const getOne = this.usersRepository
      .createQueryBuilder('user')
      .where({ userName })
      .getOne();
    try {
      const user = await getOne;
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }
}