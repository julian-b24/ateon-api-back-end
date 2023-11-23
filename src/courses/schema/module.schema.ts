import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Topic } from './topic.schema';

export type ModuleDocument = HydratedDocument<Module>;

@Schema()
export class Module {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  topics: Topic[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
