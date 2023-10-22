import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
