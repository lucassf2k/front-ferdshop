import { api, type BaseApiSchema } from '@/api';
import type {
  ListProducts,
  ListProductsOutput,
} from '@/domain/use-case/list-products';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const listProductsService: ListProducts = async ({ page, perPage }) => {
  const response = await api.get<BaseApiSchema<ListProductsOutput>>(
    `products?page=${page}&pageSize=${perPage}`,
  );
  return unwrapResultBaseAPi(response);
};
