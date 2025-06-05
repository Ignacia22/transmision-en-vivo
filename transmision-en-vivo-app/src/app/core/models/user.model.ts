export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}