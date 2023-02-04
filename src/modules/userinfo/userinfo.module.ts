import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';

@Module({
  controllers: [UserinfoController],
  providers: [UserinfoService]
})
export class UserinfoModule {}
