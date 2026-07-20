export const UserRoleEnum = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;

export type UserRole = keyof typeof UserRoleEnum;

export type User = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};
