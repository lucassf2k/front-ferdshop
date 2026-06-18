import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';
import type { ProductModel } from '@/domain/model/product';

export type UpdateProductImageInput = {
  id: string;
  file: File;
};

export type UpdateProductImageOutput = ProductModel;

export type UpdateProductImage = (
  input: UpdateProductImageInput,
) => Promise<Result<AppError, UpdateProductImageOutput>>;
