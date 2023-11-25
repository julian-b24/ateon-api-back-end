import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.decorator';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @Post('signup')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }

  @Get('validate-token-exp')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  validateTokenExpiration(@Headers('Authorization') bearerToken: string) {
    return this.authService.validateTokenExpirationDate(bearerToken);
  }

  @Get('refresh-token')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  refreshToken(@Headers('Authorization') bearerToken: string) {
    return this.authService.refreshToken(bearerToken);
  }

  @Get('user-token')
  @HttpCode(HttpStatus.OK)
  getUserByToken(@Headers('Authorization') bearerToken: string) {
    return this.authService.getUserByToken(bearerToken);
  }
}
