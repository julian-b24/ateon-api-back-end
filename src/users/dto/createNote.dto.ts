import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  groupName: string;

  @IsString()
  @IsNotEmpty()
  newNote: string;
}
