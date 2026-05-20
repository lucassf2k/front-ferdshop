import { useEffect } from 'react';
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from '@tanstack/react-query';
import { useAppToastError } from '@/contexts/app-error-toast';
import { appError, type AppError } from '@/domain/shared/api-error';
import { toast } from 'sonner';

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

  const errorType = query.error?.type;

  useEffect(() => {
    if (!errorType || !query.error) return;
    const message = appError.toUserMessage(query.error);
    switch (errorType) {
      case 'ApiError':
        toast.info(message);
        break;
      case 'NetworkError':
      case 'UnknownError':
        showError(message);
        break;
    }
  }, [errorType, query.error, showError]);

  return query;
};
