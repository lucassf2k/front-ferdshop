export type Result<E, A> = { ok: false; error: E } | { ok: true; value: A };

const err = <E, A = never>(error: E): Result<E, A> => ({ ok: false, error });

const ok = <A, E = never>(value: A): Result<E, A> => ({ ok: true, value });

const match = <E, A, R>(
  result: Result<E, A>,
  handlers: { err: (e: E) => R; ok: (a: A) => R },
): R => {
  return result.ok ? handlers.ok(result.value) : handlers.err(result.error);
};

const isOk = <E, A>(result: Result<E, A>): result is { ok: true; value: A } => {
  return result.ok;
};

const isErr = <E, A>(
  result: Result<E, A>,
): result is { ok: false; error: E } => {
  return !result.ok;
};

export const Result = {
  err,
  ok,
  match,
  isOk,
  isErr,
} as const;
