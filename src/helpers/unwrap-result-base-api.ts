import type { BaseApiSchema } from '@/api';
import { result, type Result } from '@/domain/shared/result';

export const unwrapResultBaseAPi = <E, T>(
  response: Result<E, BaseApiSchema<T>>,
) => {
  if (!response.ok) return result.err(response.error);
  return result.ok(response.value.data);
};
