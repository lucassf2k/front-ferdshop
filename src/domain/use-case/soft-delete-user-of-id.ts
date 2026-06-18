import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type SoftDeleteUserOfIdInput = {
  id: string;
};

export type SoftDeleteUserOfIdOutput = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SoftDeleteUserOfId = (
  input: SoftDeleteUserOfIdInput,
) => Promise<Result<AppError, SoftDeleteUserOfIdOutput>>;
