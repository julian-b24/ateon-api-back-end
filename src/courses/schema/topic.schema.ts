import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Resource } from './resource.schema';
import { Deliverable } from './deliverable.schema';

export type TopicDocument = HydratedDocument<Topic>;

@Schema({ _id: false })
export class Topic {
  @Prop({
    index: true,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop()
  resources: Resource[];

  @Prop()
  deliverables: Deliverable[];
}
