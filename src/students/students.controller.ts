import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDTO } from './dto/student.dto';
import { StudentRole } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  @StudentRole()
  @UseGuards(RoleGuard)
  findStudentCourses(@Body() studentDTO: StudentDTO) {
    return this.studentsService.findStudentCourses(studentDTO.email);
  }
}
