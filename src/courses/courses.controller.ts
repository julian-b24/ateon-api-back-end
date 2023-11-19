import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
//import { ModuleDTO } from './dto/module.dto';
//import { CreateTopicDTO } from './dto/createTopic.dto';

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

  /*
  @Post(':courseId/modules')
  addModule(@Param('courseId') courseId: string, @Body() moduleDTO: ModuleDTO) {
    return this.coursesService.addModuleToCourse(courseId, moduleDTO);
  }
  */

  /*
  @Post(':courseId/modules/:moduleName/topics')
  addTopic(
    @Param('courseId') courseId: string,
    @Body() createTopicDTO: CreateTopicDTO,
    @Param('moduleName') moduleName: string,
  ) {
    return this.coursesService.addTopicToModuleCourse(
      courseId,
      createTopicDTO,
      moduleName,
    );
  }
  */
}
