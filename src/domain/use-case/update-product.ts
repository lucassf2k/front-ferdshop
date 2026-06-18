import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';
import type { ProductModel } from '@/domain/model/product';

export type UpdateProductInput = {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description?: string;
};

export type UpdateProductOutput = ProductModel;

export type UpdateProduct = (
  input: UpdateProductInput,
) => Promise<Result<AppError, UpdateProductOutput>>;
