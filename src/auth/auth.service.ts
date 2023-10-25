import {
  HttpException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/signIn.dto';
import { AccessTokenDTO } from './dto/token.dto';
import { SignUpDTO } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersSerive: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<AccessTokenDTO> {
    const user = await this.usersSerive.findOneByEmail(signInDTO.email);
    const validPassword = await bcrypt.compare(
      signInDTO.password,
      user.password,
    );

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    if (!validPassword) {
      throw new NotAcceptableException('Passord or email are not valid');
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
