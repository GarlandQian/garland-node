import { Base } from '../../../common/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('files')
export class Files extends Base {
  // 给每条记录加入uid
  @Column({ name: 'uid' })
  uid: string;

  // 保存时文件名
  @Column()
  saveName: string;

  //真实文件名
  @Column()
  realName: string;

  // 保存路径
  @Column()
  path: string;

  //文件大小
  @Column()
  size: string;
}
