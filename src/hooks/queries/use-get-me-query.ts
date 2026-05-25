import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { getMeService } from '@/services/get-me';

export const useGetMeQuery = () => {
  return useBaseApiQuery({
    queryKey: queries.userKeys.me(),
    service: () => unwrapResultOrThrow(getMeService()),
  });
};
