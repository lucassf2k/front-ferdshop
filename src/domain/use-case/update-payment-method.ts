import type { PaymentMethodEnum } from '../model/order';
import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type UpdatePaymentMethodInput = {
  id: string;
  method: PaymentMethodEnum;
};

export type UpdatePaymentMethodOutput = {
  id: string;
};

export type UpdatePaymentMethod = (
  input: UpdatePaymentMethodInput,
) => Promise<Result<AppError, UpdatePaymentMethodOutput>>;
