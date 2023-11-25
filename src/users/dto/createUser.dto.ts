import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Usuario N',
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

  @ApiProperty({
    example: 'Icesi',
  })
  @IsString()
  institution?: string;

  @ApiProperty({
    example: '123456789',
  })
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'admin|student|professor',
  })
  @IsString()
  role?: string;

  @ApiProperty({
    example: 'Bussines',
  })
  @IsString()
  degree?: string;
}
