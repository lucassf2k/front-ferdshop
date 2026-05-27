import { api, type BaseApiSchema } from '@/api';
import type {
  CreateProduct,
  CreateProductOutput,
} from '@/domain/use-case/create-product';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const createProductService: CreateProduct = async (data) => {
  const response = await api.post<BaseApiSchema<CreateProductOutput>>(
    'products',
    {
      body: JSON.stringify(data),
    },
  );
  return unwrapResultBaseAPi(response);
};
