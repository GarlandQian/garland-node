import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from '../upload/entities/upload.entities';
import { DownloadService } from './download.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
