import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const { createClient } = await import('@supabase/supabase-js');
        return createClient(
          configService.get<string>('SUPABASE_URL')!,
          configService.get<string>('SUPABASE_ANON_KEY')!,
        );
      },
      inject: [ConfigService],
    },
    {
      provide: 'SUPABASE_ADMIN_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const { createClient } = await import('@supabase/supabase-js');
        return createClient(
          configService.get<string>('SUPABASE_URL')!,
          configService.get<string>('SUPABASE_SERVICE_KEY')!,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          },
        );
      },
      inject: [ConfigService],
    },
    SupabaseService,
  ],
  exports: [SupabaseService, 'SUPABASE_CLIENT', 'SUPABASE_ADMIN_CLIENT'],
})
export class SupabaseModule {}
