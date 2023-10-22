import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(username: string, password: string): Promise<User> {
    const newUser = new this.userModel({ username, password });
    return newUser.save();
  }

  async updateUser(id: string, user: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user).exec();
  }
}
