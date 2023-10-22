import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/signIn.dto';
import { AccessTokenDTO } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersSerive: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<AccessTokenDTO> {
    const user = await this.usersSerive.findOne(signInDTO.email);
    if (user?.password !== signInDTO.password) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
