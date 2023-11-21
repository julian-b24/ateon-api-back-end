import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CoursesModule } from 'src/courses/courses.module';
import { Course, CourseSchema } from 'src/courses/schema/course.schema';

@Module({
  imports: [
    CoursesModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    AuthModule,
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
})
export class ProfessorsModule {}
