import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoursesService } from 'src/courses/courses.service';
import { ScheduledCoursesDTO } from 'src/courses/dto/scheduledCourses.dto';
import { Course } from 'src/courses/schema/course.schema';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    private coursesService: CoursesService,
  ) {}

  async findProfessorCourses(professorEmail: string): Promise<Course[]> {
    return this.courseModel.find({ 'professor.email': professorEmail }).exec();
  }

  async findScheduledCourses(
    professorEmail: string,
  ): Promise<ScheduledCoursesDTO> {
    const todayDay = this.getCurrentDayOfWeek();

    const courses: Course[] = await this.courseModel
      .find({
        'professor.email': professorEmail,
        'schedule.days': { $regex: `^${todayDay}`, $options: 'i' },
      })
      .exec();

    const scheduledCourseDTO: ScheduledCoursesDTO =
      this.coursesService.getActivesTodayScheculedCourses(courses);

    return scheduledCourseDTO;
  }

  async findScheduledCoursesInADate(
    professorEmail: string,
    unixDate: number,
  ): Promise<ScheduledCoursesDTO> {
    const date = new Date(unixDate * 1);
    const dateDay = date
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();

    const courses: Course[] = await this.courseModel
      .find({
        'professor.email': professorEmail,
        'schedule.days': { $regex: `^${dateDay}`, $options: 'i' },
      })
      .exec();

    const scheduledCourseDTO: ScheduledCoursesDTO =
      this.coursesService.getScheduledCoursesInADate(courses, date);

    return scheduledCourseDTO;
  }

  private getCurrentDayOfWeek(): string {
    const now = new Date();
    const todayDay = now
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    return todayDay;
  }
}
