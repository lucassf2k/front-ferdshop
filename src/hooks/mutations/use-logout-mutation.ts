import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { logOutService } from '@/services/logout';

export const useLogOutMutation = () => {
  return useBaseApiMutation({
    service: () => unwrapResultOrThrow(logOutService()),
  });
};
