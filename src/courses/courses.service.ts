import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model } from 'mongoose';
import { CreateCourseDTO } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCourse.dto';
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
