import { AnyConstructor } from "../interfaces";
import { createObserver } from "../observers";

function createCCObserverDecorator<T extends AnyConstructor>(
  namespace: string,
  ctor: T
) {
  return class extends ctor {
    protected __observer = createObserver(this, namespace);

    protected onLoad() {
      super.onLoad && super.onLoad();

      this.__observer.observe();
    }

    protected onDestroy() {
      this.__observer.dispose();

      super.onDestroy && super.onDestroy();
    }

    protected unuse() {
      super.unuse && super.unuse();

      this.__observer.dispose();
    }

    protected reuse() {
      super.reuse && super.reuse(...Array.prototype.slice.call(arguments, 0));

      this.__observer.observe();
    }
  };
}

export function observer<T extends AnyConstructor>(constructor: T): any;

export function observer<T extends AnyConstructor>(
  namespace: string
): (constructor: T) => any;

export function observer(param: unknown) {
  const isCustomNamespace = typeof param === "string";

  if (isCustomNamespace) {
    return (constructor: AnyConstructor) =>
      createCCObserverDecorator(param, constructor);
  }

  return createCCObserverDecorator("default", param as AnyConstructor);
}
