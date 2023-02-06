import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './common/config';
import { ValidationPipe } from './common/pipe/validate.pipe';
import * as chalk from 'chalk';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局请求访问前缀
  app.setGlobalPrefix(env.SERVICE_CONFIG.apiPrefix);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(env.SWAGGER_CONFIG.title)
    .setDescription(env.SWAGGER_CONFIG.desc)
    .setVersion(env.SWAGGER_CONFIG.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(env.SWAGGER_CONFIG.setupUrl, app, document, {
    customSiteTitle: env.SWAGGER_CONFIG.title,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(env.SERVICE_CONFIG.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then(() => {
  // 这个东西就是自己拼接的东东,启动成功后在终端输出点东东实现及效果图如下
  const Host = `http://localhost`;
  console.log(
    chalk.red.bold('Swagger文档链接:'.padStart(16)),
    chalk.green.underline(
      `${Host}:${env.SERVICE_CONFIG.port}/${env.SWAGGER_CONFIG.setupUrl}`,
    ),
  );
  console.log(
    chalk.red.bold('Restful接口链接:'.padStart(16)),
    chalk.green.underline(
      `${Host}:${env.SERVICE_CONFIG.port}/${env.SERVICE_CONFIG.apiPrefix}`,
    ),
  );
});
