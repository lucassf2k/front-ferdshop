import { useMutation } from '@tanstack/react-query';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { appError, type AppError } from '@/domain/shared/api-error';
import { useAppToastError } from '@/contexts/app-error-toast';
import type { SignUpInput } from '@/domain/use-case/sign-up';
import { signUpService } from '@/services/sign-up-service';

export const useMutationSignUp = () => {
  const { showError } = useAppToastError();

  return useMutation({
    mutationFn: async (input: SignUpInput) =>
      await unwrapResultOrThrow(signUpService(input)),
    retry: (failureCount, error: AppError) => {
      return error.type === 'NetworkError' && failureCount < 2;
    },

    onError: (error: AppError) => {
      if (error.type === 'NetworkError' || error.type === 'UnknownError') {
        showError(appError.toUserMessage(error));
      }
    },
  });
};
