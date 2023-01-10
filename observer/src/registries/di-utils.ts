import { AnyConstructor, Caller } from "../interfaces";

export interface DIContainer {
  resolve<T extends AnyConstructor>(Constructor: T): InstanceType<T>;
}

export function createResolver(container: DIContainer) {
  return function (constructor: AnyConstructor, caller: Caller<unknown>) {
    const instance = container.resolve(constructor);

    return (...params: unknown[]) => caller(instance, ...params);
  };
}
