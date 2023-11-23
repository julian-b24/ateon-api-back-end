import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model } from 'mongoose';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
import { ScheduledCoursesDTO } from './dto/scheduledCourses.dto';
import { ScheduleCourse } from './interface/scheduleCourse';
//import { Module as ModuleAteon } from './schema/module.schema';
//import { ModuleDTO } from './dto/module.dto';
//import { Topic } from './schema/topic.schema';
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

  getActivesTodayScheculedCourses(todayCourses: Course[]): ScheduledCoursesDTO {
    const finishedClasses: ScheduleCourse[] = [];
    const incommingClasses: ScheduleCourse[] = [];

    todayCourses.forEach((course) => {
      const courseIsActive = this.isCourseActive(course);
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

  /*
  async addModuleToCourse(
    courseId: string,
    moduleDTO: ModuleDTO,
  ): Promise<Course> {
    //TODO: Validate if course exists, throw error if not
    const newModule: ModuleAteon = new this.moduleModel(moduleDTO);
    await this.courseModel
      .updateOne({ _id: courseId }, { $push: { modules: newModule } })
      .exec();
    const course = await this.findById(courseId);
    return course;
  }
  */

  /*
  async addTopicToModuleCourse(
    courseId: string,
    createTopicDTO: CreateTopicDTO,
    moduleName: string,
  ): Promise<Course> {
    //TODO: Validate if course exists, throw error if not
    const newTopic: Topic = new this.topicModel(createTopicDTO);
    const course: Course = await this.courseModel.findById(courseId);
    const module: ModuleAteon = course.modules.filter(
      (m) => m.name === moduleName,
    );
    return course;
  }
  */
}
