export class UserDto {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  email_confirmed_at?: string;
}

export class UsersResponseDto {
  users: UserDto[];
  total: number;
}
