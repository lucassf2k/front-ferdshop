import type { CreateProductInput } from '@/domain/use-case/create-product';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { createProductService } from '@/services/create-product';

export const useCreateProductMutation = () => {
  return useBaseApiMutation({
    service: (data: CreateProductInput) =>
      unwrapResultOrThrow(createProductService(data)),
  });
};
