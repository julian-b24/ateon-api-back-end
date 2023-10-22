import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { SkipAuth } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersServie: UsersService) {}

  @Get()
  @SkipAuth()
  findAll() {
    return this.usersServie.findAll();
  }
}
