import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RecordingDTO } from './recording.dto';
import { ModuleDTO } from './module.dto';

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  professor: string;

  @IsArray()
  @IsNotEmpty()
  students: string[];

  @IsOptional()
  @IsArray()
  modules: ModuleDTO[];

  @IsOptional()
  @IsArray()
  recordings: RecordingDTO[];
}
