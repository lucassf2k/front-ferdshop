import { api, type BaseApiSchema } from '@/api';
import type {
  GetOrderOfId,
  GetOrderOfIdOutput,
} from '@/domain/use-case/get-order-of-id';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const getOrderOfIdService: GetOrderOfId = async ({ id }) => {
  const response = await api.get<BaseApiSchema<GetOrderOfIdOutput>>(
    `orders/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
