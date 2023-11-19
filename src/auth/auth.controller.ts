import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.decorator';
import { SignInDTO } from './dto/signIn.dto';
import { SignUpDTO } from './dto/signUp.dto';
import { AccessTokenDTO } from './dto/token.dto';

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

  @Post('validate-token-exp')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  validateTokenExpiration(@Body() accessTokenDTO: AccessTokenDTO) {
    return this.authService.validateTokenExpirationDate(accessTokenDTO);
  }

  @Get('refresh-token')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() accessTokenDTO: AccessTokenDTO) {
    return this.authService.refreshToken(accessTokenDTO);
  }
}
