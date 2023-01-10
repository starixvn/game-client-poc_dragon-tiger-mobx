import { AnyFunction, Mobx } from "../interfaces";

export function createAutoRunRegistry(mobx: Mobx) {
  return function (view: AnyFunction, options: unknown) {
    return mobx.autorun(view, options);
  };
}
