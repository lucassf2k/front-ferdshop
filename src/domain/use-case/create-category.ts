import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';
import type { CategoryModel } from '@/hooks/use-categories-selector-url';

export type CreateCategoryInput = {
  name: string;
};

export type CreateCategoryOutput = CategoryModel;

export type CreateCategory = (
  input: CreateCategoryInput,
) => Promise<Result<AppError, CreateCategoryOutput>>;
