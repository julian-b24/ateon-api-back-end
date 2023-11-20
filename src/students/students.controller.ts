import { Body, Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDTO } from './dto/student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  findStudentCourses(@Body() studentDTO: StudentDTO) {
    return this.studentsService.findStudentCourses(studentDTO.email);
  }
}
