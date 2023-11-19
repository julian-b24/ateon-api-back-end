import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenDTO {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
