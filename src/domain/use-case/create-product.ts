import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';

export type CreateProductInput = {
  name: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  description?: string;
};
export type CreateProductOutput = {
  id: string;
};
export type CreateProduct = (
  data: CreateProductInput,
) => Promise<Result<AppError, CreateProductOutput>>;
