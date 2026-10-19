import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';
import type { DeliveryOptionEnum } from './create-order';

export type UpdateDeliveryOptionInput = {
  orderId: string;
  option: DeliveryOptionEnum;
};

export type UpdateDeliveryOptionOutput = {
  id: string;
};

export type UpdateDeliveryOption = (
  input: UpdateDeliveryOptionInput,
) => Promise<Result<AppError, UpdateDeliveryOptionOutput>>;
