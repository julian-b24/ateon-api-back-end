import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PROFESSOR, IS_STUDENT } from './role.decorator';
import { Payload } from 'src/auth/interface/payload';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isProfessor = this.reflector.getAllAndOverride<boolean>(
      IS_PROFESSOR,
      [context.getHandler(), context.getClass()],
    );

    const isStudent = this.reflector.getAllAndOverride<boolean>(IS_STUDENT, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (
        payload.role === 'admin' ||
        (payload.role === 'student' && isStudent) ||
        (payload.role === 'professor' && isProfessor)
      ) {
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
