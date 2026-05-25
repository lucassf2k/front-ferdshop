import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type GetMeOutput = {
  user: {
    id: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN';
  };
};

export type GetMe = () => Promise<Result<AppError, GetMeOutput>>;
