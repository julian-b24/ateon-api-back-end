import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING, {
      dbName: process.env.MONGO_DB_DBNAME,
    }),
    CoursesModule,
    StudentsModule,
    ProfessorsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
