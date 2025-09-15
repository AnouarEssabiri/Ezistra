import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { RedisService } from '../redis/redis.service';
import {
  SignupDto,
  LoginDto,
  AuthResponseDto,
} from '../../common/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly redisService: RedisService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { email, password } = signupDto;

    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseService.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new BadRequestException(error.message);
      }

      if (!user || !session) {
        throw new BadRequestException('Failed to create user');
      }

      // Store session in Redis
      await this.redisService.setSession(user.id, {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
        user_id: user.id,
      });

      // Store access token for quick lookup
      await this.redisService.setAccessToken(
        user.id,
        session.access_token,
        session.expires_at
          ? session.expires_at - Math.floor(Date.now() / 1000)
          : 3600,
      );

      return {
        user: {
          id: user.id,
          email: user.email!,
          created_at: user.created_at,
        },
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new UnauthorizedException(error.message);
      }

      if (!user || !session) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Store session in Redis
      await this.redisService.setSession(user.id, {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
        user_id: user.id,
      });

      // Store access token for quick lookup
      await this.redisService.setAccessToken(
        user.id,
        session.access_token,
        session.expires_at
          ? session.expires_at - Math.floor(Date.now() / 1000)
          : 3600,
      );

      return {
        user: {
          id: user.id,
          email: user.email!,
          created_at: user.created_at,
        },
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Login failed');
    }
  }

  async logout(userId: string): Promise<{ message: string; success: boolean }> {
    try {
      // Get session from Redis
      const session = await this.redisService.getSession(userId);

      if (session?.access_token) {
        // Sign out from Supabase
        await this.supabaseService.client.auth.signOut();
      }

      // Remove session and access token from Redis
      await this.redisService.deleteSession(userId);
      await this.redisService.deleteAccessToken(userId);

      return {
        message: 'Successfully logged out',
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException('Logout failed');
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const {
        data: { user, session },
        error,
      } = await this.supabaseService.client.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !user || !session) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Update session in Redis
      await this.redisService.setSession(user.id, {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
        user_id: user.id,
      });

      // Update access token
      await this.redisService.setAccessToken(
        user.id,
        session.access_token,
        session.expires_at
          ? session.expires_at - Math.floor(Date.now() / 1000)
          : 3600,
      );

      return {
        user: {
          id: user.id,
          email: user.email!,
          created_at: user.created_at,
        },
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Token refresh failed');
    }
  }
}
