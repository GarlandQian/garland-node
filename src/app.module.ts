import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationPipe } from './common/pipe/validate.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './common/config';
import { UsersModule } from './modules/users/users.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import UnifyExceptionFilter from './common/filters/uinify-exception.filter';
import { UnifyResponseInterceptor } from './common/interceptor/unify-response.interceptor';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import loggerMiddleware from './common/logger/logger.middleware';
import { UsersController } from './modules/users/users.controller';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './modules/upload/upload.module';
import { LoginModule } from './modules/login/login.module';
import { LoginController } from './modules/login/login.controller';
import { DownloadModule } from './modules/download/download.module';
import { DownloadController } from './modules/download/download.controller';

console.log('-==-env-=-', env.DATABASE_CONFIG);
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.prettyPrint(),
            winston.format.json(),
          ),
        }),
        new winston.transports.Console({
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.prettyPrint(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/upload'),
      serveRoot: '/upload',
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    LoginModule,
    DownloadModule,
  ],
  controllers: [
    AppController,
    LoginController,
    DownloadController,
    UsersController,
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: UnifyExceptionFilter,
    },
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: UnifyResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // 应用全局中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
