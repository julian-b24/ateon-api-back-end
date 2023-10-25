import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/signIn.dto';
import { AccessTokenDTO } from './dto/token.dto';
import { SignUpDTO } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersSerive: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<AccessTokenDTO> {
    const user = await this.usersSerive.findOneByUsername(signInDTO.email);
    if (user?.password !== signInDTO.password) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDTO: SignUpDTO): Promise<SignUpDTO> {
    const existsUser = this.usersSerive.existsUser(signUpDTO.email);
    if (!existsUser) {
      const newUser = this.usersSerive.createUser(signUpDTO);
      return newUser;
    }
    throw HttpException.createBody(
      '',
      'There already exists an user with that email',
      400,
    );
  }

  async signUpSSO(): Promise<void> {}
}
