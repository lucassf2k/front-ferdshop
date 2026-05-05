import { api } from '@/api';
import type { SignUp, SignUpOutput } from '@/domain/use-case/sign-up';

export const signUpService: SignUp = async (input) => {
  return await api.post<SignUpOutput>('users', {
    body: JSON.stringify(input),
  });
};
