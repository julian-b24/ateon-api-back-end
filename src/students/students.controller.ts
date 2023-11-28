import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentRole } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private authService: AuthService,
  ) {}

  @Get('courses')
  @ApiResponse({
    status: 200,
    description: 'List of the courses that a student is part of',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token of the logged user',
    example: 'Bearer token',
  })
  @StudentRole()
  @UseGuards(RoleGuard)
  async findStudentCourses(@Headers('Authorization') bearerToken: string) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.studentsService.findStudentCourses(payload.email);
  }

  @Get('schedules')
  @StudentRole()
  @UseGuards(RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'List of the courses that a student has schedule for today',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token of the logged user',
  })
  async findStudentScheduledCourses(
    @Headers('Authorization') bearerToken: string,
  ) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.studentsService.findScheduledCourses(payload.email);
  }

  @Get('schedules/:unixDate')
  @StudentRole()
  @UseGuards(RoleGuard)
  @ApiResponse({
    status: 200,
    description: 'List of the courses that a student has schedule in the date',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token of the logged user',
  })
  async findStudentScheduledCoursesInADate(
    @Headers('Authorization') bearerToken: string,
    @Param('unixDate') unixDate: number,
  ) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.studentsService.findScheduledCoursesInADate(
      payload.email,
      unixDate,
    );
  }
}
