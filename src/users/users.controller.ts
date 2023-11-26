import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SkipAuth } from 'src/auth/auth.decorator';
import { CreateNoteDTO } from './dto/createNote.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersServie: UsersService) {}

  @Get()
  @SkipAuth()
  findAll() {
    return this.usersServie.findAll();
  }

  @Get(':userId')
  findById(@Param('userId') userId: string) {
    this.validateIdIsNotNull(userId);
    return this.usersServie.findOne(userId);
  }

  @Post(':userId/notes')
  addNote(
    @Param('userId') userId: string,
    @Body() createNoteDTO: CreateNoteDTO,
  ) {
    return this.usersServie.addNote(userId, createNoteDTO);
  }

  private validateIdIsNotNull(userId: string) {
    if (userId === null) throw new BadRequestException('userId is required');
  }
}
