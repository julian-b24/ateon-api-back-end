import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SkipAuth } from './auth.decorator';
import { SignInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
