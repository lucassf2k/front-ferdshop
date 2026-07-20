import type { ProductModel } from '../model/product';
import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type ListProductsInput = {
  page: string;
  perPage: string;
  name?: string;
  categoryId?: string;
};

export type ListProductsOutput = {
  products: ProductModel[];
  total: number;
};

export type ListProducts = (
  input: ListProductsInput,
) => Promise<Result<AppError, ListProductsOutput>>;
