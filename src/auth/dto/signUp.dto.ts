import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({
    example: 'UsuarioN',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'usuarioN@example.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'contraseñaN',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
