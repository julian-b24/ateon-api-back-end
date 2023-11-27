import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfessorRole } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':courseId')
  findById(@Param('courseId') courseId: string) {
    return this.coursesService.findById(courseId);
  }

  @Get(':courseName')
  findCourseByName(@Param('courseName') courseName: string) {
    return this.coursesService.findByCourseName(courseName);
  }

  @Post()
  createCourse(@Body() createCourseDTO: CreateCourseDTO) {
    return this.coursesService.createCourse(createCourseDTO);
  }

  @Put(':courseId')
  updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    return this.coursesService.updateCourse(courseId, updateCourseDTO);
  }

  @Get(':courseId/metrics')
  @ProfessorRole()
  @UseGuards(RoleGuard)
  getMetrics(@Param('courseId') courseId: string) {
    return this.coursesService.getMetrics(courseId);
  }
}
