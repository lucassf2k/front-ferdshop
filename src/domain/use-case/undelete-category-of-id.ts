import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type UndeleteCategoryOfIdInput = {
  id: string;
  headers: {
    bearer: string;
  };
};

export type UndeleteCategoryOfIdOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UndeleteCategoryOfId = (
  input: UndeleteCategoryOfIdInput,
) => Promise<Result<AppError, UndeleteCategoryOfIdOutput>>;
