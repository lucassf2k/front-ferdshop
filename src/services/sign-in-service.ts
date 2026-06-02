import { api, type BaseApiSchema } from '@/api';
import type { SignIn, SignInOutput } from '@/domain/use-case/sign-in';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const signInService: SignIn = async (input) => {
  const response = await api.post<BaseApiSchema<SignInOutput>>('auth', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return unwrapResultBaseAPi(response);
};
