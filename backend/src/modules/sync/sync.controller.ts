import { Controller, Post, Get, Body, Query, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { SyncService } from './sync.service';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('api/sync')
@UseGuards(AuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('upload')
  async upload(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id;
    if (!userId) throw new NotFoundException('User not found');

    const backupId = body.backupId || body.backup?.backupId || `backup:${Date.now()}`;
    await this.syncService.storeBackup(userId, backupId, body);
    return { ok: true, backupId };
  }

  @Get('download')
  async download(@Req() req: any, @Query('backupId') backupId: string) {
    const userId = req.user?.id;
    if (!userId) throw new NotFoundException('User not found');
    if (!backupId) {
      const latest = await this.syncService.getLatestBackup(userId);
      if (!latest) throw new NotFoundException('No backup found for user');
      backupId = latest.backupId;
    }
    const blob = await this.syncService.getBackup(userId, backupId);
    if (!blob) throw new NotFoundException('Backup not found');
    return blob;
  }
}
