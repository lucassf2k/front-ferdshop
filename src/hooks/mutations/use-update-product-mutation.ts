import type { UpdateProductInput } from '@/domain/use-case/update-product';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updateProductService } from '@/services/update-product';

export const useUpdateProductMutation = () => {
  return useBaseApiMutation({
    service: (data: UpdateProductInput) =>
      unwrapResultOrThrow(updateProductService(data)),
  });
};
