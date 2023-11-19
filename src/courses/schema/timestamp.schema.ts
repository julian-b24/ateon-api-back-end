import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimestampDocument = HydratedDocument<Timestamp>;

@Schema({ _id: false })
export class Timestamp {
  @Prop({
    required: true,
    unique: true,
  })
  seconds: number;

  @Prop()
  note: string;
}
