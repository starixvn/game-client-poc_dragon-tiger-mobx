export type AnyConstructor = new (...args: any[]) => any;

export interface Mobx {
  autorun(...params: unknown[]);
  reaction(...params: unknown[]);
}

export interface DIContainer {
  resolve<T extends AnyConstructor>(Constructor: T): InstanceType<T>;
}

export interface IWatcher<T> {
  watch(): T;
}

export interface IHandler<Param> {
  handle(param: Param): Promise<void>;
}

export interface Caller<T> {
  (instance: T, ...params: unknown[]): unknown;
}
