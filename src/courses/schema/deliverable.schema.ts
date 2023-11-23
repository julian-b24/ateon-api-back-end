import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Grade } from '../interface/grade';

export type DeliverableDocument = HydratedDocument<Deliverable>;

@Schema()
export class Deliverable {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop()
  type: 'exam' | 'task';

  @Prop({ default: 'pending' })
  status: 'completed' | 'pending' | 'in progress';

  @Prop({ default: [] })
  grades: Grade[];
}
