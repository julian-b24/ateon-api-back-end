import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { NoteGroup } from './schema/note.schema';
import { CreateNoteDTO } from './dto/createNote.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findById({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.password = await this.encryptPassword(createUserDTO.password);
    const newUser = new this.userModel(createUserDTO);
    return newUser.save();
  }

  async updateUser(id: string, user: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user).exec();
  }

  async existsUser(email: string): Promise<boolean> {
    const existUsers = this.userModel.find({ email: email });
    return (await existUsers).length === 1;
  }

  async addNote(userId: string, createNoteDTO: CreateNoteDTO): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (user) {
      const noteGroup: NoteGroup = user.notesGroups.find(
        (group) => group.groupName === createNoteDTO.groupName,
      );

      if (noteGroup) {
        const index = user.notesGroups.indexOf(noteGroup);
        noteGroup.notes.push(createNoteDTO.newNote);
        user.notesGroups[index] = noteGroup;
      } else {
        const newNoteGroup = new NoteGroup();
        newNoteGroup.groupName = createNoteDTO.groupName;
        newNoteGroup.notes = [];
        newNoteGroup.notes.push(createNoteDTO.newNote);
        user.notesGroups.push(newNoteGroup);
      }
      return user.save();
    } else {
      throw new NotFoundException('User not found');
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = process.env.MONGO_DB_CONNECTION_STRING;
    return await bcrypt.hash(password, salt);
  }
}
