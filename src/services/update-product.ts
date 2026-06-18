import { api, type BaseApiSchema } from '@/api';
import type {
  UpdateProduct,
  UpdateProductOutput,
} from '@/domain/use-case/update-product';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updateProductService: UpdateProduct = async (input) => {
  const response = await api.patch<BaseApiSchema<UpdateProductOutput>>(
    `products/${input.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    },
  );
  return unwrapResultBaseAPi(response);
};
