import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type ListUsersInput = {
  page: string;
  perPage: string;
};

export type ListUsersOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}[];

export type ListUsers = (
  input: ListUsersInput,
) => Promise<Result<AppError, ListUsersOutput>>;
