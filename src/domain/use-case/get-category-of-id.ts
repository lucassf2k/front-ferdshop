import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type GetCategoryOfIdInput = {
  id: string;
};

export type GetCategoryOfIdOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCategoryOfId = (
  input: GetCategoryOfIdInput,
) => Promise<Result<AppError, GetCategoryOfIdOutput>>;
