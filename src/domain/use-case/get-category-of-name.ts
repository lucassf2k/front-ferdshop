import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type GetCategoryOfNameInput = {
  name: string;
};

export type GetCategoryOfNameOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCategoryOfName = (
  input: GetCategoryOfNameInput,
) => Promise<Result<AppError, GetCategoryOfNameOutput>>;
