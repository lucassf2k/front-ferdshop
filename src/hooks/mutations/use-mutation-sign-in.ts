import type { SignInInput } from '@/domain/use-case/sign-in';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { signInService } from '@/services/sign-in-service';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';

export const useMutationSignIn = () => {
  return useBaseApiMutation({
    service: (data: SignInInput) => unwrapResultOrThrow(signInService(data)),
  });
};
