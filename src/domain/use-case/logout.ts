import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type LogOutOutput = {
  code: string;
};

export type LogOut = () => Promise<Result<AppError, LogOutOutput>>;
