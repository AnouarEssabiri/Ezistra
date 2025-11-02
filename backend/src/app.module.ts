import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SyncModule } from './modules/sync/sync.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    RedisModule,
    AuthModule,
    UsersModule,
  // Sync module provides cloud backup endpoints for IndexedDB
  SyncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
