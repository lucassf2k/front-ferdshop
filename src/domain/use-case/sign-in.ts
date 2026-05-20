import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = {
  code: string;
};

export type SignIn = (
  input: SignInInput,
) => Promise<Result<AppError, SignInOutput>>;
