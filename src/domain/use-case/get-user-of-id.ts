import type { AppError } from '../shared/api-error';
import type { Result } from '../shared/result';

export type GetUserOfIdInput = {
  id: string;
};

export type GetUserOfIdOutput = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetUserOfId = (
  input: GetUserOfIdInput,
) => Promise<Result<AppError, GetUserOfIdOutput>>;
