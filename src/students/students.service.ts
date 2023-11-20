import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/courses/schema/course.schema';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findStudentCourses(studentEmail: string): Promise<Course[]> {
    return this.courseModel.find({ 'students.email': studentEmail }).exec();
  }
}
