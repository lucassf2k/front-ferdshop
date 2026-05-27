import type { CategoryModel } from '@/hooks/use-categories-selector-url';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type GetCategoryOfIdInput = {
  id: string;
};

export type GetCategoryOfIdOutput = CategoryModel;

export type GetCategoryOfId = (
  input: GetCategoryOfIdInput,
) => Promise<Result<AppError, GetCategoryOfIdOutput>>;
