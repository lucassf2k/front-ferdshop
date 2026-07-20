import type { SignUpInput } from '@/domain/use-case/sign-up';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { signUpService } from '@/services/sign-up-service';
import { toast } from 'sonner';

export const useMutationSignUp = () => {
  return useBaseApiMutation({
    service: (data: SignUpInput) => unwrapResultOrThrow(signUpService(data)),
    options: {
      onSuccess: () => {
        toast.success('Usuário criado com sucesso!');
      },
    },
  });
};
