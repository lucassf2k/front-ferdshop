import type { OrderStatusEnum } from '@/domain/entities/order';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type UpdateOrderStatusInput = {
  id: string;
  status: OrderStatusEnum;
};

export type UpdateOrderStatusOutput = {
  id: string;
};

export type UpdateOrderStatus = (
  input: UpdateOrderStatusInput,
) => Promise<Result<AppError, UpdateOrderStatusOutput>>;
