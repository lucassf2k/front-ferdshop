import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type UploadProductImageInput = {
  file: File;
};

export type UploadProductImageOutput = {
  code: string;
};

export type UploadProductImage = (
  data: UploadProductImageInput,
) => Promise<Result<AppError, UploadProductImageOutput>>;
