import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    @Inject('SUPABASE_ADMIN_CLIENT')
    private readonly supabaseAdmin: SupabaseClient,
  ) {}

  get client(): SupabaseClient {
    return this.supabase;
  }

  get adminClient(): SupabaseClient {
    return this.supabaseAdmin;
  }

  async verifyJwt(jwt: string) {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser(jwt);

      if (error) {
        throw error;
      }

      return user;
    } catch (error) {
      throw new Error(`JWT verification failed: ${error.message}`);
    }
  }

  async getUserById(userId: string) {
    try {
      const {
        data: { user },
        error,
      } = await this.supabaseAdmin.auth.admin.getUserById(userId);

      if (error) {
        throw error;
      }

      return user;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      const {
        data: { users },
        error,
      } = await this.supabaseAdmin.auth.admin.listUsers();

      if (error) {
        throw error;
      }

      return users;
    } catch (error) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }
}
