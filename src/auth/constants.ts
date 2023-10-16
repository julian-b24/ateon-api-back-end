import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const jwtConstants = {
  secret: configService.get<string>('JWT_SECRET_KEY'),
};
