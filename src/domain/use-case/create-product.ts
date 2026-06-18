import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';

export type CreateProductInput = {
  file: File;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description?: string;
};
export type CreateProductOutput = {
  id: string;
};
export type CreateProduct = (
  data: CreateProductInput,
) => Promise<Result<AppError, CreateProductOutput>>;
