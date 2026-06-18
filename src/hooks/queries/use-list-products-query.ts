import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { listProductsService } from '@/services/list-products';

type Input = {
  page: string;
  perPage: string;
};

export const useListProductsQuery = (input: Input) => {
  return useBaseApiQuery({
    queryKey: queries.productKeys.pagination(input.page, input.perPage),
    service: () => unwrapResultOrThrow(listProductsService(input)),
  });
};
