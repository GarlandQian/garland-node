import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './entities/upload.entities';
import { getfilesize } from 'src/common/utils/fileSize.utils';
import { nanoid } from 'nanoid';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Files)
    private filesRepository: Repository<Files>,
  ) {}

  async save(file: Express.Multer.File): Promise<any> {
    const { originalname, size, filename, path } = file;

    const uid = nanoid();

    const createSql = this.filesRepository
      .createQueryBuilder()
      .insert()
      .values({
        uid,
        saveName: filename,
        realName: originalname,
        path,
        size: `${getfilesize(size)}`,
      })
      .execute();

    await createSql;

    return uid;
  }
}
