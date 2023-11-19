import { IsString } from 'class-validator';
export class DeliverableDTO {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  status: string;
}
