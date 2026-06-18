import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { logOutService } from '@/services/logout';
import { useQueryClient } from '@tanstack/react-query';

export const useLogOutMutation = () => {
  const queryClient = useQueryClient();

  return useBaseApiMutation({
    service: () => unwrapResultOrThrow(logOutService()),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queries.userKeys.me(),
        });
      },
    },
  });
};
