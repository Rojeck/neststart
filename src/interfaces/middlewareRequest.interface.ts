import { User } from '@prisma/client';

export interface MiddlewareRequestInterface extends Request {
  user: User;
}
