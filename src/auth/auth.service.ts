import {
  HttpException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/signIn.dto';
import { AccessTokenDTO } from './dto/token.dto';
import { SignUpDTO } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { TokenValidationDTO } from './dto/tokenValidation.dto';
import { UserDTO } from 'src/users/dto/user.dto';
import { Payload } from './interface/payload';

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

    const payload: Payload = { email: user.email, role: user.role };
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

  async validateTokenExpirationDate(
    bearerToken: string,
  ): Promise<TokenValidationDTO> {
    const tokenValidation: TokenValidationDTO = new TokenValidationDTO();
    tokenValidation.accessToken = this.extractTokenFromBearerToken(bearerToken);

    try {
      await this.jwtService.verifyAsync(tokenValidation.accessToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      tokenValidation.stillValid = true;
    } catch (error) {
      tokenValidation.stillValid = false;
    }

    return tokenValidation;
  }

  async getUserByToken(bearerToken: string): Promise<UserDTO> {
    const token: string = this.extractTokenFromBearerToken(bearerToken);
    const payload: Payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    const user = await this.usersSerive.findOneByEmail(payload.email);
    return user;
  }

  async refreshToken(bearerToken: string): Promise<AccessTokenDTO> {
    const token: string = this.extractTokenFromBearerToken(bearerToken);
    const oldTokenPayload: Payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
      ignoreExpiration: true,
    });

    this.validateUserExistsMyEmail(oldTokenPayload.email);
    const newAccessToken: AccessTokenDTO =
      await this.createNewToken(oldTokenPayload);

    return newAccessToken;
  }

  private extractTokenFromBearerToken(bearerToken: string): string | undefined {
    const [type, token] = bearerToken.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateUserExistsMyEmail(email: string): Promise<void> {
    const user = await this.usersSerive.findOneByEmail(email);
    if (user === null) {
      throw new UnauthorizedException();
    }
  }

  private async createNewToken(payload: Payload): Promise<AccessTokenDTO> {
    const newPayload: Payload = {
      email: payload.email,
      role: payload.role,
    };

    const newAccessToken: AccessTokenDTO = {
      accessToken: await this.jwtService.signAsync(newPayload),
    };
    return newAccessToken;
  }

  async signUpSSO(): Promise<void> {}
}
