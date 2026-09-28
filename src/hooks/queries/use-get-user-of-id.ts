import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { getUserOfIdService } from '@/services/get-user-of-id';

type Input = {
  id?: string;
  enabled?: boolean;
};

export const useGetUserOfIdQuery = ({ id, enabled }: Input) => {
  return useBaseApiQuery({
    queryKey: queries.userKeys.getOfId(id!),
    service: () => unwrapResultOrThrow(getUserOfIdService({ id: id! })),
    options: {
      enabled: enabled && Boolean(id),
    },
  });
};
