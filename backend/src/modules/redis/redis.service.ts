import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.redis.setex(key, ttlSeconds, value);
    } else {
      await this.redis.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  // Session management methods
  async setSession(
    userId: string,
    sessionData: any,
    ttlSeconds: number = 86400, // 24 hours default
  ): Promise<void> {
    const key = `session:${userId}`;
    await this.set(key, JSON.stringify(sessionData), ttlSeconds);
  }

  async getSession(userId: string): Promise<any | null> {
    const key = `session:${userId}`;
    const data = await this.get(key);
    return data ? JSON.parse(data) : null;
  }

  async deleteSession(userId: string): Promise<void> {
    const key = `session:${userId}`;
    await this.del(key);
  }

  // Cache management methods
  async setCache(
    key: string,
    data: any,
    ttlSeconds: number = 300, // 5 minutes default
  ): Promise<void> {
    await this.set(`cache:${key}`, JSON.stringify(data), ttlSeconds);
  }

  async getCache(key: string): Promise<any | null> {
    const data = await this.get(`cache:${key}`);
    return data ? JSON.parse(data) : null;
  }

  async deleteCache(key: string): Promise<void> {
    await this.del(`cache:${key}`);
  }

  async invalidateCachePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Store access token for quick validation
  async setAccessToken(
    userId: string,
    accessToken: string,
    ttlSeconds: number = 3600, // 1 hour default
  ): Promise<void> {
    const key = `access_token:${userId}`;
    await this.set(key, accessToken, ttlSeconds);
  }

  async getAccessToken(userId: string): Promise<string | null> {
    const key = `access_token:${userId}`;
    return this.get(key);
  }

  async deleteAccessToken(userId: string): Promise<void> {
    const key = `access_token:${userId}`;
    await this.del(key);
  }
}
