import type { PaymentStatusEnum } from '@/domain/model/order';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type UpdatePaymentStatusInput = {
  id: string;
  paymentStatus: PaymentStatusEnum;
};

export type UpdatePaymentStatusOutput = {
  id: string;
};

export type UpdatePaymentStatus = (
  input: UpdatePaymentStatusInput,
) => Promise<Result<AppError, UpdatePaymentStatusOutput>>;
