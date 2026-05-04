export const unwrapResultOrThrow = async <E, A>(
  promise: Promise<{ ok: boolean; value?: A; error?: E }>,
): Promise<A> => {
  const result = await promise;

  if (!result.ok) {
    return Promise.reject(result.error);
  }

  return result.value as A;
};
