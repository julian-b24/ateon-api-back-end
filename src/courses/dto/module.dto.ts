import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TopicDTO } from './topic.dto';

export class ModuleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  topics: TopicDTO[];

  @IsString()
  @IsNotEmpty()
  description: string;
}
