import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type SoftDeleteProductOfIdInput = {
  id: string;
};
export type SoftDeleteProductOfIdOutput = null;

export type SoftDeleteProductOfId = (
  input: SoftDeleteProductOfIdInput,
) => Promise<Result<AppError, SoftDeleteProductOfIdOutput>>;
