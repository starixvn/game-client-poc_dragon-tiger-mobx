import { REACTION_KEY } from "../constants";
import { Caller } from "../interfaces";
import { metadata } from "../metadata-utils";

export function executeWatcher(watcher: IWatcher<unknown>) {
  return watcher.watch();
}

export function render<T extends IWatcher<any>>(
  constructor: new (...args: any[]) => T
): MethodDecorator;

export function render<T>(
  constructor: new (...args: any[]) => T,
  caller: Caller<T>
): MethodDecorator;

export function render(...args: any[]) {
  const [target, customCaller] = args;
  const isCustomCaller = typeof customCaller === "function";

  const data = {
    constructor: target,
    caller: isCustomCaller ? customCaller : executeWatcher,
  };

  return metadata(REACTION_KEY, data);
}

export interface IWatcher<T> {
  watch(): T;
}
