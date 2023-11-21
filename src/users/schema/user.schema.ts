import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NoteGroup } from './note.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Prop({ default: '' })
  institution: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: '' })
  degree: string;

  @Prop({ default: '' })
  profilePhotoURL: string;

  @Prop({ default: [] })
  notesGroups: NoteGroup[];
}

export const UserSchema = SchemaFactory.createForClass(User);
