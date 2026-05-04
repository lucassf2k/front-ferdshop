import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = {
  token: string;
};

export type SignIn = (
  input: SignInInput,
) => Promise<Result<AppError, SignInOutput>>;
