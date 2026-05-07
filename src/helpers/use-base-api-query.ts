import { useEffect } from 'react';
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from '@tanstack/react-query';
import { useAppToastError } from '@/contexts/app-error-toast';
import { appError, type AppError } from '@/domain/shared/api-error';

type Service<T> = () => Promise<T>;
type UseBaseQueryParams<T> = {
  queryKey: QueryKey;
  service: Service<T>;
  options?: Omit<UseQueryOptions<T, AppError>, 'queryKey' | 'queryFn'>;
};

export const useBaseApiQuery = <T>({
  queryKey,
  service,
  options,
}: UseBaseQueryParams<T>) => {
  const { showError } = useAppToastError();

  const query = useQuery<T, AppError>({
    queryKey,
    queryFn: service,
    retry: (failureCount, error) => {
      if (typeof options?.retry === 'function') {
        return options.retry(failureCount, error);
      }
      if (typeof options?.retry === 'boolean') {
        return options.retry;
      }
      if (typeof options?.retry === 'number') {
        return failureCount < options.retry;
      }
      return error.type === 'NetworkError' && failureCount < 2;
    },
    ...options,
  });

  useEffect(() => {
    if (!query.error?.type) return;
    if (
      query.error.type === 'NetworkError' ||
      query.error.type === 'UnknownError'
    ) {
      showError(appError.toUserMessage(query.error));
    }
  }, [query.error, showError]);

  return query;
};
