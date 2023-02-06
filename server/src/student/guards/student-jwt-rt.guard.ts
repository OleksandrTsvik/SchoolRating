import { AuthGuard } from '@nestjs/passport';

export class StudentJwtRtGuard extends AuthGuard('student-jwt-refresh-token') {}