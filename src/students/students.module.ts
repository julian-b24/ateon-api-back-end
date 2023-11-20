import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CoursesModule } from 'src/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/courses/schema/course.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    CoursesModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    AuthModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
