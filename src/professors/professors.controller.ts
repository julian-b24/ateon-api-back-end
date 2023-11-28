import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { ProfessorRole } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ProfessorsService } from './professors.service';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Professors')
@Controller('professors')
export class ProfessorsController {
  constructor(
    private professorService: ProfessorsService,
    private authService: AuthService,
  ) {}

  @Get('courses')
  @ProfessorRole()
  @UseGuards(RoleGuard)
  async findProfessorCourses(@Headers('Authorization') bearerToken: string) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.professorService.findProfessorCourses(payload.email);
  }

  @Get('schedules')
  @ProfessorRole()
  @UseGuards(RoleGuard)
  async findProfessorScheduledCourses(
    @Headers('Authorization') bearerToken: string,
  ) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.professorService.findScheduledCourses(payload.email);
  }

  @Get('schedules/:unixDate')
  @ProfessorRole()
  @UseGuards(RoleGuard)
  async findProfessorScheduledCoursesInADate(
    @Headers('Authorization') bearerToken: string,
    @Param('unixDate') unixDate: number, //In milliseconds
  ) {
    const token =
      await this.authService.extractTokenFromBearerToken(bearerToken);
    const payload = await this.authService.getTokenPayload(token);
    return this.professorService.findScheduledCoursesInADate(
      payload.email,
      unixDate,
    );
  }
}
