import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { listUsersService } from '@/services/list-users';

type Input = {
  page: string;
  perPage: string;
};

export const useListUsersQuery = (input: Input) => {
  return useBaseApiQuery({
    queryKey: queries.userKeys.all,
    service: () => unwrapResultOrThrow(listUsersService(input)),
  });
};
