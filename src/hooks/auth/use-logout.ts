import { useCallback } from 'react';
import { useLogOutMutation } from '@/hooks/mutations/use-logout-mutation';

export const useLogOut = () => {
  const { mutateAsync } = useLogOutMutation();
  const logOut = useCallback(async () => {
    await mutateAsync();
  }, [mutateAsync]);

  return {
    logOut,
  };
};
