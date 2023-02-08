import { Base } from '../../../common/common/entity/base.entity';
import { Entity, Column, BeforeInsert } from 'typeorm';

@Entity('user')
export class User extends Base {
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'real_name' })
  realName: string;

  @Column()
  password: string;

  @Column()
  gender: number;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({ name: 'dept_id' })
  deptId: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'password_salt', select: false })
  passwordSalt: string;

  @Column({ default: 0 })
  status: number;
}
