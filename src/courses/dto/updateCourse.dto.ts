import { IsArray, IsOptional, IsString } from 'class-validator';
import { RecordingDTO } from './recording.dto';
import { ModuleDTO } from './module.dto';

export class UpdateCourseDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  professor: string;

  @IsOptional()
  @IsArray()
  students: string[];

  @IsOptional()
  @IsArray()
  modules: ModuleDTO[];

  @IsOptional()
  @IsArray()
  recordings: RecordingDTO[];
}
