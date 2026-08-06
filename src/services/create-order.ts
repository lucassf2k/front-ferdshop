import { api, type BaseApiSchema } from '@/api';
import type {
  CreateOrder,
  CreateOrderOutput,
} from '@/domain/use-case/create-order';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const createOrderService: CreateOrder = async (data) => {
  const response = await api.post<BaseApiSchema<CreateOrderOutput>>('orders', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return unwrapResultBaseAPi(response);
};
