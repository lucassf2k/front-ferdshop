import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type CreateCategoryInput = {
  name: string;
};

export type CreateCategoryOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCategory = (
  input: CreateCategoryInput,
) => Promise<Result<AppError, CreateCategoryOutput>>;
