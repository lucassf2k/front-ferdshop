import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type ListCategoriesOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListCategories = () => Promise<
  Result<AppError, ListCategoriesOutput[]>
>;
