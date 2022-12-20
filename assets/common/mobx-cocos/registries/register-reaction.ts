import { AnyFunction, Mobx } from "../interfaces";

export function createReactionRegistry(mobx: Mobx) {
  return function (watch: AnyFunction, view: AnyFunction, opts: unknown) {
    const options = Object.assign({ fireImmediately: true }, opts);

    return mobx.reaction(watch, view, options);
  };
}
