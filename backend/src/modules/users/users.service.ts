import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { RedisService } from '../redis/redis.service';
import { UserDto, UsersResponseDto } from '../../common/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly redisService: RedisService,
  ) {}

  async findAll(): Promise<UsersResponseDto> {
    try {
      // Check cache first
      const cachedUsers = await this.redisService.getCache('users:all');
      if (cachedUsers) {
        return cachedUsers;
      }

      // Fetch from Supabase
      const users = await this.supabaseService.getAllUsers();

      const userDtos: UserDto[] = users.map((user) => ({
        id: user.id,
        email: user.email!,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        email_confirmed_at: user.email_confirmed_at,
      }));

      const response: UsersResponseDto = {
        users: userDtos,
        total: userDtos.length,
      };

      // Cache for 5 minutes
      await this.redisService.setCache('users:all', response, 300);

      return response;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      // Check cache first
      const cachedUser = await this.redisService.getCache(`user:${id}`);
      if (cachedUser) {
        return cachedUser;
      }

      // Fetch from Supabase
      const user = await this.supabaseService.getUserById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userDto: UserDto = {
        id: user.id,
        email: user.email!,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        email_confirmed_at: user.email_confirmed_at,
      };

      // Cache for 10 minutes
      await this.redisService.setCache(`user:${id}`, userDto, 600);

      return userDto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async getCurrentUser(userId: string): Promise<UserDto> {
    return this.findOne(userId);
  }

  // Invalidate user cache when user data changes
  async invalidateUserCache(userId?: string): Promise<void> {
    if (userId) {
      await this.redisService.deleteCache(`user:${userId}`);
    }
    // Invalidate all users cache
    await this.redisService.deleteCache('users:all');
  }
}
