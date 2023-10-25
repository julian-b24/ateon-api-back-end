import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
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

  private async encryptPassword(password: string): Promise<string> {
    const salt = process.env.MONGO_DB_CONNECTION_STRING;
    return await bcrypt.hash(password, salt);
  }
}
