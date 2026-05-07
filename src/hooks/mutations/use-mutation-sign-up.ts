import type { SignUpInput } from '@/domain/use-case/sign-up';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { signUpService } from '@/services/sign-up-service';

export const useMutationSignUp = () => {
  return useBaseApiMutation({
    service: (data: SignUpInput) => unwrapResultOrThrow(signUpService(data)),
  });
};
