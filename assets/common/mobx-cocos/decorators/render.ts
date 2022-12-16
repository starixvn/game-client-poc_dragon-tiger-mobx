import { Caller } from "../interfaces";

function registerWithAutoRunMode(...args: any[]) {
  const isDefaultDecorator = args.length === 3;
  const key = "AUTO_RUN";

  if (isDefaultDecorator) {
    Reflect.defineMetadata(key, {}, args[0], args[1]);
  } else {
    return Reflect.metadata(key, Object.assign({}, args[0]));
  }
}

function registerWithReactionMode(...args: any[]) {
  const isCustomCaller = args[1] && typeof args[1] === "function";

  const data = {
    constructor: args[0],
    options: {},
    caller: (instance: IWatcher<unknown>) => instance.watch(),
  };

  if (isCustomCaller) {
    const options = args[2] ?? {};
    const caller = args[1];

    data.options = options;
    data.caller = caller;
  }

  return Reflect.metadata("REACTION", data);
}

export function render<T extends IWatcher<any>>(
  constructor: new (...args: any[]) => T
): MethodDecorator;
export function render<T>(
  constructor: new (...args: any[]) => T,
  caller: Caller<T>
): MethodDecorator;
export function render(): MethodDecorator;
export function render(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<unknown>
): void;

export function render(...args: any[]) {
  const isReaction = args.length && typeof args[0] === "function";

  return isReaction
    ? registerWithReactionMode(...args)
    : registerWithAutoRunMode(...args);
}

export interface IWatcher<T> {
  watch(): T;
}
