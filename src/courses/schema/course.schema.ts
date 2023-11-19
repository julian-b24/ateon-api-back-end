import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Module from 'module';
import { HydratedDocument } from 'mongoose';
import { ModuleSchema } from './module.schema';
import { Recording, RecordingSchema } from './recording.schema';
import { CourseProfessor, CourseUser } from '../interface/courseUser';

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
}

export const CourseSchema = SchemaFactory.createForClass(Course);
