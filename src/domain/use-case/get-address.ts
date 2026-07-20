import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type GetAddressInput = {
  latitude: number;
  longitude: number;
};

export type GetAddressOutput = {
  city: string;
  state: string;
  country: string;
  street: string;
  houseNumber: string | null;
};

export type GetAddress = (
  input: GetAddressInput,
) => Promise<Result<AppError, GetAddressOutput>>;
