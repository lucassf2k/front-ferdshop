import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useAppToastError } from '@/contexts/app-error-toast';
import { appError, type AppError } from '@/domain/shared/api-error';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

type Service<TData, TVariables> = (variables: TVariables) => Promise<TData>;

type UseBaseMutationParams<TData, TVariables, TContext = unknown> = {
  service: Service<TData, TVariables>;
  options?: Omit<
    UseMutationOptions<TData, AppError, TVariables, TContext>,
    'mutationFn'
  >;
};

export const useBaseApiMutation = <
  TData,
  TVariables = void,
  TContext = unknown,
>({
  service,
  options,
}: UseBaseMutationParams<TData, TVariables, TContext>) => {
  const navigate = useNavigate();
  const { showError } = useAppToastError();

  return useMutation<TData, AppError, TVariables, TContext>({
    mutationFn: service,

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

    onError: (error, variables, onMutateResult, context) => {
      switch (error.type) {
        case 'ApiError': {
          const message = appError.toUserMessage(error);
          toast.warning(message);
          if (error.code === 'UNAUTHORIZED' || error.code === 'FORBIDDEN') {
            navigate('/login');
          }
          break;
        }
        case 'NetworkError':
        case 'UnknownError':
          showError(appError.toUserMessage(error));
          break;
      }
      options?.onError?.(error, variables, onMutateResult, context);
    },

    ...options,
  });
};
