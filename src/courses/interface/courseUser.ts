export class CourseUser {
  name: string;
  email: string;
}

export class CourseProfessor extends CourseUser {
  degree: string;
  phoneNumber: string;
  profilePicture: string;
}
