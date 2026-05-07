import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useAppToastError } from '@/contexts/app-error-toast';
import { appError, type AppError } from '@/domain/shared/api-error';

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
      if (error.type === 'NetworkError' || error.type === 'UnknownError') {
        showError(appError.toUserMessage(error));
      }

      options?.onError?.(error, variables, onMutateResult, context);
    },

    ...options,
  });
};
