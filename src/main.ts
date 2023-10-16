import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common/services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Env configuration reading
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port');
  app.setGlobalPrefix('ateon-api/v1');
  await app.listen(port || 3000);
  Logger.log(` ~ Application is running on ${await app.getUrl()}`);
}
bootstrap();
