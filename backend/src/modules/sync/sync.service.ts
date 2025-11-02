import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SyncService {
  constructor(private readonly redisService: RedisService) {}

  private backupKey(userId: string, backupId: string) {
    return `sync:backup:${userId}:${backupId}`;
  }

  private latestKey(userId: string) {
    return `sync:latest:${userId}`;
  }

  async storeBackup(userId: string, backupId: string, payload: any): Promise<void> {
    const key = this.backupKey(userId, backupId);
    await this.redisService.set(key, JSON.stringify(payload));
    // mark as latest
    await this.redisService.set(this.latestKey(userId), JSON.stringify({ backupId, createdAt: new Date().toISOString() }));
  }

  async getBackup(userId: string, backupId: string): Promise<any | null> {
    const key = this.backupKey(userId, backupId);
    const data = await this.redisService.get(key);
    return data ? JSON.parse(data) : null;
  }

  async getLatestBackup(userId: string): Promise<any | null> {
    const meta = await this.redisService.get(this.latestKey(userId));
    return meta ? JSON.parse(meta) : null;
  }
}
