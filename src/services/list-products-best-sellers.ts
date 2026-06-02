import { api, type BaseApiSchema } from '@/api';
import type {
  ListProductsBestSellers,
  ListProductsBestSellersOutput,
} from '@/domain/use-case/list-products-best-sellers';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const listProductsBestSellersService: ListProductsBestSellers = async ({
  quantity,
}) => {
  const response = await api.get<
    BaseApiSchema<ListProductsBestSellersOutput[]>
  >(`products/best-sellers?quantity=${quantity}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return unwrapResultBaseAPi(response);
};
