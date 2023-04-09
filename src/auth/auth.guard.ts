import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Assuming token is passed in the "Authorization" header
    if (!token) {
      throw new UnauthorizedException('Missing JWT token');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        publicKey: 'secret',
      });

      request.user = decoded; // Attach the decoded user object to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}
