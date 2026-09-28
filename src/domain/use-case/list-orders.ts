import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';
import type { OrderModel } from '@/domain/model/order';

export type ListOrdersInput = {
  page: string;
  perPage: string;
};

export type ListOrdersOutput = {
  orders: OrderModel[];
  total: number;
};

export type ListOrders = (
  input: ListOrdersInput,
) => Promise<Result<AppError, ListOrdersOutput>>;
