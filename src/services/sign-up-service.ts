import { api, type BaseApiSchema } from '@/api';
import type { SignUp, SignUpOutput } from '@/domain/use-case/sign-up';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const signUpService: SignUp = async (input) => {
  const response = await api.post<BaseApiSchema<SignUpOutput>>('users', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return unwrapResultBaseAPi(response);
};
