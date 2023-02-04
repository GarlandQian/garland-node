import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationPipe } from './common/pipe/validate.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './common/config';
import { UserinfoModule } from './modules/userinfo/userinfo.module';
import { LoggerModule } from 'nestjs-pino';

console.log('-==-env-=-', env.DATABASE_CONFIG);
@Module({
  imports: [
    LoggerModule.forRoot(),
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    UserinfoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
