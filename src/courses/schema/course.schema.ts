import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Module from 'module';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { ModuleSchema } from './module.schema';
import { Recording, RecordingSchema } from './recording.schema';

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
  professor: User;

  @Prop({
    default: [],
  })
  students: User[];

  @Prop({ type: [ModuleSchema], default: [] })
  modules: Module[];

  @Prop({ type: [RecordingSchema], default: [] })
  recordings: Recording[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
