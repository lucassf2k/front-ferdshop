import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type GetMeOutput = {
  id: string;
  email: string;
  role: string;
};

export type GetMe = () => Promise<Result<AppError, GetMeOutput>>;
