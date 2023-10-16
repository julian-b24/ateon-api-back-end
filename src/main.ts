import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common/services';

import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Env configuration reading
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.setGlobalPrefix('ateon-api/v1');

  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  await app.listen(port || 3000);
  Logger.log(` ~ Application is running on ${await app.getUrl()}`);
}
bootstrap();
