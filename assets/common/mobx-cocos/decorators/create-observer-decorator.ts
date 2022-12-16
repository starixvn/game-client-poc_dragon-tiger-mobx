import { AnyConstructor, DIContainer, Mobx } from "../interfaces";
import { createObserver } from "../observers/create-observer";

export function createObserverDecorator<T extends AnyConstructor>(
  mobx: Mobx,
  diContainer: DIContainer,
  Constructor: T
) {
  return class extends Constructor {
    protected mobxObserver = createObserver(this, mobx, diContainer);

    protected onLoad() {
      if (super.onLoad && super.onLoad() === false) {
        return;
      }

      this.mobxObserver.observe();
    }

    protected onDestroy() {
      this.mobxObserver.dispose();

      if (super.onDestroy) {
        super.onDestroy();
      }
    }

    protected unuse() {
      if (super.unuse) {
        super.unuse();
      }

      this.mobxObserver.dispose();
    }

    protected reuse() {
      if (super.reuse) {
        super.reuse(...Array.prototype.slice.call(arguments, 0));
      }

      this.mobxObserver.observe();
    }
  };
}
