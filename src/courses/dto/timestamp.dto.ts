import { IsNumber, IsString } from 'class-validator';

export class TimestampDTO {
  @IsNumber()
  seconds: number;

  @IsString()
  annotation: string;
}
