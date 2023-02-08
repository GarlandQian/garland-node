import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/upload.entities';
import { nanoid } from 'nanoid';
import { checkDirAndCreate } from '../../common/utils/dirop.utils';

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Module({
  imports: [
    TypeOrmModule.forFeature([Files]),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: (req, file, cb) => {
          // 根据上传的文件类型将图片视频音频和其他类型文件分别存到对应英文文件夹
          const mimeType = file.mimetype.split('/')[1];
          let temp = 'other';
          image.filter((item) => item === mimeType).length > 0
            ? (temp = 'image')
            : '';
          video.filter((item) => item === mimeType).length > 0
            ? (temp = 'video')
            : '';
          audio.filter((item) => item === mimeType).length > 0
            ? (temp = 'audio')
            : '';
          const filePath = `./public/upload/${temp}/${dayjs().format(
            'YYYY-MM-DD',
          )}`;
          checkDirAndCreate(filePath); // 判断文件夹是否存在，不存在则自动生成
          return cb(null, `./${filePath}`);
        },
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const fileType = file.originalname.split('.');
          const filename = `${nanoid()}.${fileType[fileType.length - 1]}`;
          return cb(null, filename);
        },
      }),
      fileFilter(req, file, cb) {
        const mimeType = file.mimetype.split('/')[1].toLowerCase();
        let temp = 'other';
        image.filter((item) => item === mimeType).length > 0
          ? (temp = 'image')
          : '';
        video.filter((item) => item === mimeType).length > 0
          ? (temp = 'video')
          : '';
        audio.filter((item) => item === mimeType).length > 0
          ? (temp = 'audio')
          : '';
        if (temp === 'other') {
          return cb(new BadRequestException('文件格式错误！'), false);
        }
        return cb(null, true);
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
