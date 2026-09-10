import { useGetMeQuery } from '@/hooks/queries/use-get-me-query';

export const useAuth = () => {
  const { data, isLoading, error, isFetching, refetch } = useGetMeQuery();
  const user = data?.user ?? null;
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    isFetching,
    refetch,
  };
};
