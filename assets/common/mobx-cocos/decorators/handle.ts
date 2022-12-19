import { Caller, IHandler } from "../interfaces";
import { Reflect } from "../reflect-metadata";

export function handle<T extends IHandler<any>>(
  constructor: new (...args: any[]) => T
): MethodDecorator;
export function handle<T>(
  constructor: new (...args: any[]) => T,
  caller: Caller<T>
): MethodDecorator;

export function handle(...args: any[]) {
  const defaultCaller = (instance: IHandler<unknown>, param: any) =>
    instance.handle(param);

  const data = {
    constructor: args[0],
    caller: args[1] ?? defaultCaller,
  };

  return Reflect.metadata("HANDLER", data);
}
