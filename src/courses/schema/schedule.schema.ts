import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ _id: false })
export class Schedule {
  @Prop()
  days: string[];

  @Prop()
  startHour: string;

  @Prop()
  endHour: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}
