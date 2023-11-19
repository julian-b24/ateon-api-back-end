import { IsArray, IsNumber, IsString } from 'class-validator';
import { TimestampDTO } from './timestamp.dto';

export class RecordingDTO {
  @IsString()
  urlLink: string;

  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsArray()
  timestamps: TimestampDTO[];
}
