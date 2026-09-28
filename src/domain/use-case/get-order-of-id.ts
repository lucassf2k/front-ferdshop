import type { OrderModelWithProducts } from '@/domain/model/order';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type GetOrderOfIdInput = {
  id: string;
};

export type GetOrderOfIdOutput = OrderModelWithProducts;

export type GetOrderOfId = (
  input: GetOrderOfIdInput,
) => Promise<Result<AppError, GetOrderOfIdOutput>>;
