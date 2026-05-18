import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { listProductsBestSellersService } from '@/services/list-products-best-sellers';

type Input = {
  quantity: number;
};

export const useListProductsBestSellersQuery = (input: Input) => {
  return useBaseApiQuery({
    queryKey: queries.productKeys.bestSellers(),
    service: () => unwrapResultOrThrow(listProductsBestSellersService(input)),
  });
};
