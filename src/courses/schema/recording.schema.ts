import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Timestamp } from './timestamp.schema';

export type RecordingDocument = HydratedDocument<Recording>;

@Schema()
export class Recording {
  @Prop({
    index: true,
    required: true,
    unique: true,
    trim: true,
  })
  title: string;

  @Prop()
  durationSeconds: number;

  @Prop()
  link: string;

  @Prop()
  timestamps: Timestamp[];
}

export const RecordingSchema = SchemaFactory.createForClass(Recording);
