import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { ProfessorRole } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ProfessorsService } from './professors.service';
import { AuthService } from 'src/auth/auth.service';

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
}
