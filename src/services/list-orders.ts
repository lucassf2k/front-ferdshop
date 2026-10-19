import { api, type BaseApiSchema } from '@/api';
import type {
  ListOrders,
  ListOrdersOutput,
} from '@/domain/use-case/list-orders';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const listOrdersService: ListOrders = async ({ page, perPage }) => {
  const paramas = new URLSearchParams();
  paramas.set('page', page);
  paramas.set('pageSize', perPage);

  const response = await api.get<BaseApiSchema<ListOrdersOutput>>(
    `orders?${paramas.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
