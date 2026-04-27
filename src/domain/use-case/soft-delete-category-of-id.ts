import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type SoftDeleteCategoryOfIdInput = {
  id: string;
};

export type SoftDeleteCategoryOfIdOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SoftDeleteCategoryOfId = (
  input: SoftDeleteCategoryOfIdInput,
) => Promise<Result<AppError, SoftDeleteCategoryOfIdOutput>>;
