import type { User } from '@/domain/entities/user';
import type { Result } from '../shared/result';
import type { AppError } from '../shared/api-error';

export type SignUpInput = User;

export type SignUpOutput = {
  id: string;
};

export type SignUp = (
  input: SignUpInput,
) => Promise<Result<AppError, SignUpOutput>>;
