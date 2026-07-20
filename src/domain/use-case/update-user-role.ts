import type { UserModel } from '@/domain/model/user';
import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';

export type UpdateUserRoleInput = {
  id: string;
  role: string;
};

export type UpdateUserRoleOutput = UserModel;

export type UpdateUserRole = (
  data: UpdateUserRoleInput,
) => Promise<Result<AppError, UpdateUserRoleOutput>>;
