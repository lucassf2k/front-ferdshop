import type { UserModel } from '@/domain/model/user';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type ListUsersInput = {
  page: string;
  perPage: string;
};

export type ListUsersOutput = {
  users: UserModel[];
  total: number;
};

export type ListUsers = (
  input: ListUsersInput,
) => Promise<Result<AppError, ListUsersOutput>>;
