import type { UpdateProductImageInput } from '@/domain/use-case/update-product-image';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updateProductImageService } from '@/services/update-product-image';

export const useUpdateProductImageMutation = () => {
  return useBaseApiMutation({
    service: (data: UpdateProductImageInput) =>
      unwrapResultOrThrow(updateProductImageService(data)),
  });
};
