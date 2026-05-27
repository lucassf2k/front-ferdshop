import type { CategoryModel } from '@/hooks/use-categories-selector-url';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type GetCategoryOfNameInput = {
  name: string;
};

export type GetCategoryOfNameOutput = CategoryModel;

export type GetCategoryOfName = (
  input: GetCategoryOfNameInput,
) => Promise<Result<AppError, GetCategoryOfNameOutput>>;
