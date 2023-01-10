export type AnyConstructor = new (...args: any[]) => any;

export interface Caller<T> {
  (instance: T, ...params: unknown[]): unknown;
}
