import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduledCoursesDTO } from 'src/courses/dto/scheduledCourses.dto';
import { ScheduleCourse } from 'src/courses/interface/scheduleCourse';
import { Course } from 'src/courses/schema/course.schema';

@Injectable()
export class ProfessorsService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findProfessorCourses(professorEmail: string): Promise<Course[]> {
    return this.courseModel.find({ 'professor.email': professorEmail }).exec();
  }

  async findScheduledCourses(
    professorEmail: string,
  ): Promise<ScheduledCoursesDTO> {
    const now = new Date();
    const todayDay = this.getCurrentDayOfWeek();

    const courses: Course[] = await this.courseModel
      .find({
        'professor.email': professorEmail,
        'schedule.day': { $regex: `^${todayDay}`, $options: 'i' },
      })
      .exec();

    const finishedClasses: ScheduleCourse[] = [];
    const incommingClasses: ScheduleCourse[] = [];

    courses.forEach((course) => {
      const courseIsActive = this.isCourseActive(course);
      if (courseIsActive) {
        const endHour = course.schedule.endHour;

        const endDateTime = new Date(now);
        endDateTime.setHours(
          Number(endHour.split(':')[0]),
          Number(endHour.split(':')[1]),
        );

        const scheduleCourse: ScheduleCourse = {
          courseName: course.name,
          startHour: course.schedule.startHour,
          endHour: course.schedule.endHour,
        };

        if (now < endDateTime) {
          incommingClasses.push(scheduleCourse);
        } else {
          finishedClasses.push(scheduleCourse);
        }
      }
    });

    const scheduledCourseDTO: ScheduledCoursesDTO = {
      finishedClasses,
      incommingClasses,
    };

    return scheduledCourseDTO;
  }

  private isCourseActive(course: Course): boolean {
    const now = new Date();
    const startDate = new Date(course.schedule.startDate);
    const endDate = new Date(course.schedule.endDate);

    const nowDate = now.toISOString().slice(0, 10);
    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    return startDateString <= nowDate && nowDate <= endDateString;
  }

  private getCurrentDayOfWeek(): string {
    const now = new Date();
    const todayDay = now
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase();
    return todayDay;
  }
}
