import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  institution: string;

  @IsString()
  phone: string;

  @IsString()
  role: string;

  @IsString()
  degree: string;

  @IsString()
  profilePhotoURL: string;
}
