import { api, type BaseApiSchema } from '@/api';
import type {
  SoftDeleteProductOfId,
  SoftDeleteProductOfIdOutput,
} from '@/domain/use-case/soft-delete-product-of-id';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const softDeleteProductOfIdService: SoftDeleteProductOfId = async ({
  id,
}) => {
  const response = await api.delete<BaseApiSchema<SoftDeleteProductOfIdOutput>>(
    `products/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
