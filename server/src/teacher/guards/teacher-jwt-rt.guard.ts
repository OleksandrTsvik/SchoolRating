import { AuthGuard } from '@nestjs/passport';

export class TeacherJwtRtGuard extends AuthGuard('teacher-jwt-refresh-token') {}