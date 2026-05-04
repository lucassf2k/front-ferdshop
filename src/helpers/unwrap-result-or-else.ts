import type { Result } from '@/domain/shared/result';

export const unwrapResultOrElse = async <E, A>(
  promise: Promise<Result<E, A>>,
  fallback: (e: E) => A,
): Promise<A> => {
  const res = await promise;
  return res.ok ? res.value : fallback(res.error);
};
