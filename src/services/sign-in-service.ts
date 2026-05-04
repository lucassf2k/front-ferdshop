import { api } from '@/api';
import type { SignIn } from '@/domain/use-case/sign-in';

export const signInService: SignIn = async (input) => {
  return await api.post<{ token: string }>('sign-in', {
    body: JSON.stringify(input),
  });
};
