import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { Result } from '../../common/common/dto/result.dto';
import { Public } from '../../common/decorator/public.decorator';
import { CreateFileManageDto } from './dto/upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiTags('上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @Public()
  @UseInterceptors(FileInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传文件' })
  async upload(@UploadedFile() file, @Body() body: CreateFileManageDto) {
    console.log(body);
    console.log(file); //上传图片的信息  必须在form的属性里面配置enctype="multipart/form-data"
    // const writeStream = createWriteStream(
    //   join(__dirname, '/public/upload/', `${Date.now()}-${file.originalname}`),
    // );
    // writeStream.write(file.buffer);
    // return new Result().ok();
  }
}
