import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Module } from './module.schema';
import { HydratedDocument } from 'mongoose';
import { ModuleSchema } from './module.schema';
import { Recording, RecordingSchema } from './recording.schema';
import { CourseProfessor, CourseUser } from '../interface/courseUser';
import { Schedule } from './schedule.schema';
import { Session } from '../interface/session';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({
    index: true,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    index: false,
    required: true,
  })
  professor: CourseProfessor;

  @Prop({
    default: [],
  })
  students: CourseUser[];

  @Prop({ type: [ModuleSchema], default: [] })
  modules: Module[];

  @Prop({ type: [RecordingSchema], default: [] })
  recordings: Recording[];

  @Prop({ default: null })
  schedule: Schedule;

  @Prop()
  sessions: Session[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
