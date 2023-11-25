import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common/services';

import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Env configuration reading
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  app.setGlobalPrefix('ateon-api/v1');

  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  app.enableCors();

  //Documentation configuration
  const configDocs = new DocumentBuilder()
    .setTitle('Ateon API Documentation')
    .setDescription(
      'The following documentation describes the API methods available and its parameters',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer(
      'ateon-api-back-end-production.up.railway.app/ateon-api/v1',
      'Production',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('ateon-api/v1/docs', app, document);

  await app.listen(port || 3000);
  Logger.log(` ~ Application is running on ${await app.getUrl()}`);
}
bootstrap();
