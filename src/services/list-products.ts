import { api, type BaseApiSchema } from '@/api';
import type {
  ListProducts,
  ListProductsOutput,
} from '@/domain/use-case/list-products';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const listProductsService: ListProducts = async (input) => {
  const params = new URLSearchParams();
  params.set('page', input.page);
  params.set('pageSize', input.perPage);

  if (input.name) {
    params.set('name', input.name);
  }

  if (input.categoryId) {
    params.set('categoryId', input.categoryId);
  }

  const response = await api.get<BaseApiSchema<ListProductsOutput>>(
    `products?${params.toString()}`,
  );
  return unwrapResultBaseAPi(response);
};
