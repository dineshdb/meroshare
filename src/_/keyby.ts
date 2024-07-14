// Copied from https://github.com/cloudacy/keyby

export function keyBy<
  A extends object,
  K extends keyof {
    [P in keyof A as A[P] extends PropertyKey ? P : never]: unknown;
  },
>(array: A[], key: K) {
  return array.reduce(
    (r, x) => ({ ...r, [x[key] as unknown as PropertyKey]: x }),
    {} as { [P in A[K] as A[K] extends PropertyKey ? A[K] : never]: A },
  );
}

export function keyByFunction<A extends object, K extends PropertyKey>(
  array: A[],
  keyFn: (x: A) => K,
) {
  return array.reduce(
    (r, x) => ({ ...r, [keyFn(x)]: x }),
    {} as { [P in K]: A },
  );
}

export default keyBy;
