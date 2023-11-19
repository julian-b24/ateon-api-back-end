import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ResourceDTO } from './resource.dto';
import { DeliverableDTO } from './deliverable.dto';

export class TopicDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  resources: ResourceDTO[];

  @IsArray()
  deliverables: DeliverableDTO[];
}
