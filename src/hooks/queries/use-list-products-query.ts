import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { listProductsService } from '@/services/list-products';

type Input = {
  page: string;
  perPage: string;
  name?: string;
  categoryId?: string;
};

export const useListProductsQuery = (input: Input) => {
  return useBaseApiQuery({
    queryKey: queries.productKeys.search(input.page, input.perPage, {
      name: input.name,
      categoryId: input.categoryId,
    }),
    service: () => unwrapResultOrThrow(listProductsService(input)),
  });
};
