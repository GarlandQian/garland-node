import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Repository } from 'typeorm';
import { Files } from '../upload/entities/upload.entities';

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(Files)
    private filesRepository: Repository<Files>,
  ) {}

  async download(uid: string) {
    const sql = this.filesRepository
      .createQueryBuilder('file')
      .where('file.uid = :uid', { uid })
      .getOne();
    const file = await sql;
    const base = join(__dirname, '../');
    const path = `${base}/${file.path}`;
    return { path, filename: file.realName };
  }
}
