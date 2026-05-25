import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLogOutMutation } from '@/hooks/mutations/use-logout-mutation';
import { queries } from '@/constants/queries';

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useLogOutMutation();
  return useCallback(async () => {
    await mutateAsync();

    queryClient.removeQueries({
      queryKey: queries.userKeys.me(),
    });
  }, [mutateAsync, queryClient]);
};
