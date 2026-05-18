import type { ProductModel } from '@/domain/model/product';
import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';

export type ListProductsBestSellersInput = {
  quantity: number;
};

export type ListProductsBestSellersOutput = {
  product: ProductModel;
  totalSold: number;
};

export type ListProductsBestSellers = (
  input: ListProductsBestSellersInput,
) => Promise<Result<AppError, ListProductsBestSellersOutput[]>>;
