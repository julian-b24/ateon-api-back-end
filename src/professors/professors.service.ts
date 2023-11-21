import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/courses/schema/course.schema';

@Injectable()
export class ProfessorsService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findProfessorCourses(professorEmail: string): Promise<Course[]> {
    return this.courseModel.find({ 'professor.email': professorEmail }).exec();
  }
}
