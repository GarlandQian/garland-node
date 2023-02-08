import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { getFileManageDto } from './dto/down-file.dto';

@ApiBearerAuth()
@Controller('download')
@ApiTags('上传/下载')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post()
  @ApiOperation({ summary: '文件下载' })
  async download(@Res() response: Response, @Body() body: getFileManageDto) {
    const { path, filename } = await this.downloadService.download(body.uid);
    // 设置响应头，控制浏览器下载该文件
    response.setHeader(
      'content-disposition',
      'attachment;filename=' + filename,
    );
    response.sendFile(path);
  }

  @Get(':id')
  @ApiOperation({ summary: '展示文件' })
  async view(@Res() response: Response, @Param('id') id: string) {
    const { path } = await this.downloadService.download(id);
    response.sendFile(path);
  }
}
