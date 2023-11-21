import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteGroupDocument = HydratedDocument<NoteGroup>;

@Schema({ _id: false })
export class NoteGroup {
  @Prop({ index: true, trim: true, required: true })
  groupName: string;

  @Prop({ default: [] })
  notes: string[];
}
