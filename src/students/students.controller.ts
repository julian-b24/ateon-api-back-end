import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentRole } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('students')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private authService: AuthService,
  ) {}

  @Get('courses')
  @StudentRole()
  @UseGuards(RoleGuard)
  async findStudentCourses(@Headers('Authorization') bearerToken: string) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.studentsService.findStudentCourses(payload.email);
  }
}
