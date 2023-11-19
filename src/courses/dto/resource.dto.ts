import { IsArray, IsString } from 'class-validator';
export class ResourceDTO {
  @IsString()
  text: string;

  @IsArray()
  link: string;

  @IsString()
  type: string;

  @IsString()
  status: string;
}
