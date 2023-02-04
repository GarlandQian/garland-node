import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userinfo')
export class Userinfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  realname: string;

  @Column()
  createTime: string;

  @Column()
  updateTime: string;

  @Column()
  isEnable: number;
}
