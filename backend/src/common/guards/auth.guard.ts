import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../../modules/supabase/supabase.service';
import { RedisService } from '../../modules/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    try {
      // Verify JWT with Supabase
      const user = await this.supabaseService.verifyJwt(token);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Check if session exists in Redis
      const session = await this.redisService.getSession(user.id);
      if (!session) {
        throw new UnauthorizedException('Session expired');
      }

      // Attach user to request object for use in controllers
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
