import { AnyConstructor } from "../interfaces";
import { mobxCocosData } from "./configure";
import { createObserverDecorator } from "./create-observer-decorator";

export function observer<T extends AnyConstructor>(constructor: T) {
  return createObserverDecorator(
    mobxCocosData.mobx,
    mobxCocosData.diContainer,
    constructor
  );
}
