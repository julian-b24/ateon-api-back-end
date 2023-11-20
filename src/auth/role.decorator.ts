import { SetMetadata } from '@nestjs/common';

export const IS_PROFESSOR = 'isProfessor';
export const ProfessorRole = () => SetMetadata(IS_PROFESSOR, true);

export const IS_STUDENT = 'isStudent';
export const StudentRole = () => SetMetadata(IS_STUDENT, true);

export const IS_ADMIN = 'isAdmin';
export const AdminRole = () => SetMetadata(IS_STUDENT, true);
