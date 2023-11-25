import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
  @ApiProperty({
    example: 'Linear Algebra',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  groupName: string;

  @ApiProperty({
    example: 'Record new topic video',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  newNote: string;
}
