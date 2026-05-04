import { useMutation } from '@tanstack/react-query';
import type { SignInInput } from '@/domain/use-case/sign-in';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { signInService } from '@/services/sign-in-service';
import type { AppError } from '@/domain/shared/api-error';
import { useAppToastError } from '@/contexts/app-error-toast';

export const useMutationSignIn = () => {
  const { showError } = useAppToastError();

  return useMutation({
    mutationFn: (input: SignInInput) =>
      unwrapResultOrThrow(signInService(input)),
    retry: (failureCount, error: AppError) => {
      return error.type === 'NetworkError' && failureCount < 2;
    },

    onError: (error: AppError) => {
      if (error.type === 'NetworkError' || error.type === 'UnknownError') {
        showError('Houve um pequeno inconveniente, tente novamente.');
      }
    },
  });
};
