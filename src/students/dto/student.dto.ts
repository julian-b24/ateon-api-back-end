import { IsEmail } from 'class-validator';

export class StudentDTO {
  @IsEmail()
  email: string;
}
