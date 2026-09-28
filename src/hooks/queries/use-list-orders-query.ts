import { queries } from '@/constants/queries';
import type { ListOrdersInput } from '@/domain/use-case/list-orders';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { listOrdersService } from '@/services/list-orders';

export const useListOrdersQuery = (input: ListOrdersInput) => {
  return useBaseApiQuery({
    queryKey: queries.orderKeys.pagination(input.page, input.perPage),
    service: () => unwrapResultOrThrow(listOrdersService(input)),
  });
};
