import { AuthGuard } from '@nestjs/passport';

export class AdminJwtRtGuard extends AuthGuard('admin-jwt-refresh-token') {}