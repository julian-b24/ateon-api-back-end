import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema({ _id: false })
export class Resource {
  @Prop()
  text: string;

  @Prop()
  link: string;

  @Prop()
  type: 'text' | 'video';

  @Prop()
  status: 'completed' | 'pending' | 'in progress';
}
