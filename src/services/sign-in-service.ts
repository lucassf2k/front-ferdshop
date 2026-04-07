import type { SignIn } from '@/domain/use-case/sign-in';

export const signInService: SignIn = async (input) => {
  const response = await fetch('http://localhost:3001/api/v1/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error('Failed to sign in');
  }
  const data = await response.json();
  return {
    token: data.token,
  };
};
