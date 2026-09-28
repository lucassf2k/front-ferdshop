import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { getOrderOfIdService } from '@/services/get-order-of-id';

type Input = {
  id?: string;
  enabled?: boolean;
};

export const useGetOrderOfIdQuery = ({ id, enabled }: Input) => {
  return useBaseApiQuery({
    queryKey: queries.orderKeys.getOfId(id!),
    service: () => unwrapResultOrThrow(getOrderOfIdService({ id: id! })),
    options: {
      enabled: enabled && Boolean(id),
    },
  });
};
