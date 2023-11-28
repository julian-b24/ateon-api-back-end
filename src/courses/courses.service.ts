import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Module } from './schema/module.schema';
import { Model } from 'mongoose';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
import { ScheduledCoursesDTO } from './dto/scheduledCourses.dto';
import { ScheduleCourse } from './interface/scheduleCourse';
import { Topic } from './schema/topic.schema';
import { Resource } from './schema/resource.schema';
import { CourseMetricsDTO } from './dto/courseMetrics.dto';
import { Grade } from './interface/grade';
import { Deliverable } from './schema/deliverable.schema';
import { Session } from './interface/session';
//import { ModuleDTO } from './dto/module.dto';
//import { CreateTopicDTO } from './dto/createTopic.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>, //@InjectModel(ModuleAteon.name) private moduleModel: Model<ModuleAteon>,
  ) {} //@InjectModel(Topic.name) private topicModel: Model<Topic>,

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findById(courseId: string): Promise<Course | undefined> {
    return this.courseModel.findById(courseId).exec();
  }

  async findByCourseName(courseName: string): Promise<Course | undefined> {
    return this.courseModel.findOne({ name: courseName }).exec();
  }

  async createCourse(courseDTO: CreateCourseDTO): Promise<Course> {
    const newCourse = new this.courseModel(courseDTO);
    return newCourse.save();
  }

  async updateCourse(
    courseId: string,
    courseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    const updatedCourse = this.courseModel.findByIdAndUpdate(
      courseId,
      courseDTO,
    );
    return updatedCourse;
  }

  async getMetrics(courseId: string): Promise<CourseMetricsDTO> {
    const course: Course | null = await this.courseModel
      .findById(courseId)
      .exec();
    const metrics: CourseMetricsDTO = {
      courseCompletion: this.calculateCourseCompletion(course),
      deliverablesGrades: this.getDeliverablesScores(course),
      assistance: this.getAssistanceBySession(course),
    };
    return metrics;
  }

  getActivesTodayScheculedCourses(todayCourses: Course[]): ScheduledCoursesDTO {
    const finishedClasses: ScheduleCourse[] = [];
    const incomingClasses: ScheduleCourse[] = [];

    todayCourses.forEach((course) => {
      const courseIsActive = this.isCourseActive(course, new Date());
      if (courseIsActive) {
        const now = new Date();
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
          incomingClasses.push(scheduleCourse);
        } else {
          finishedClasses.push(scheduleCourse);
        }
      }
    });

    const scheduledCourseDTO: ScheduledCoursesDTO = {
      finishedClasses,
      incomingClasses,
    };

    return scheduledCourseDTO;
  }

  getScheduledCoursesInADate(
    dayCourses: Course[],
    date: Date,
  ): ScheduledCoursesDTO {
    const finishedClasses: ScheduleCourse[] = [];
    const incomingClasses: ScheduleCourse[] = [];

    dayCourses.forEach((course) => {
      const courseIsActive = this.isCourseActive(course, date);
      if (courseIsActive) {
        const now = new Date();
        const endDate = new Date(course.schedule.endDate);
        const endDateTime = new Date(now);

        const endHour = course.schedule.endHour;
        endDateTime.setHours(
          Number(endHour.split(':')[0]),
          Number(endHour.split(':')[1]),
        );

        const scheduleCourse: ScheduleCourse = {
          courseName: course.name,
          startHour: course.schedule.startHour,
          endHour: course.schedule.endHour,
        };

        if (now > date) {
          finishedClasses.push(scheduleCourse);
        } else if (now < endDate && now < endDateTime) {
          incomingClasses.push(scheduleCourse);
        } else {
          finishedClasses.push(scheduleCourse);
        }
      }
    });

    const scheduledCourseDTO: ScheduledCoursesDTO = {
      finishedClasses,
      incomingClasses,
    };

    return scheduledCourseDTO;
  }

  private isCourseActive(course: Course, date: Date): boolean {
    const startDate = new Date(course.schedule.startDate);
    const endDate = new Date(course.schedule.endDate);

    const dateString = date.toISOString().slice(0, 10);
    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    return startDateString <= dateString && dateString <= endDateString;
  }

  private calculateCourseCompletion(course: Course): number {
    let totalCourseResources: number = 0;
    let completedResources: number = 0;
    course.modules.forEach((module: Module) => {
      module.topics.forEach((topic: Topic) => {
        topic.resources.forEach((resource: Resource) => {
          totalCourseResources += 1;
          if (resource.status === 'completed') completedResources += 1;
        });
      });
    });

    const courseCompletion: number =
      100 * (completedResources / totalCourseResources);
    return courseCompletion;
  }

  private getDeliverablesScores(course: Course): any[] {
    const deliverablesScores = [];
    course.modules.forEach((module: Module) => {
      module.topics.forEach((topic: Topic) => {
        topic.deliverables.forEach((deliverable: Deliverable) => {
          const scores = {};
          scores[deliverable.name] = this.groupGradesByValue(
            deliverable.grades,
          );
          deliverablesScores.push(scores);
        });
      });
    });
    return deliverablesScores;
  }

  private getAssistanceBySession(course: Course): object {
    const assistance = {};
    course.sessions.forEach((session: Session) => {
      const date = new Date(session.date);
      assistance[date.toLocaleDateString()] = session.participants.length;
    });
    return assistance;
  }

  private groupGradesByValue(grades: Grade[]): object {
    return {
      '0 - 0.9': grades.filter((grade) => grade.grade < 1).length,
      '1 - 1.9': grades.filter((grade) => grade.grade < 2 && grade.grade >= 1)
        .length,
      '2 - 2.9': grades.filter((grade) => grade.grade < 3 && grade.grade >= 2)
        .length,
      '3 - 3.9': grades.filter((grade) => grade.grade < 4 && grade.grade >= 3)
        .length,
      '4 - 5': grades.filter((grade) => grade.grade >= 4).length,
    };
  }
}
