import { HANDLER_KEY } from "../constants";
import { metadata } from "../metadata-utils";

export function executeHandler(instance: IHandler<unknown>, param: any) {
  instance.handle(param);
}

export function handle<T extends IHandler<any>>(
  constructor: new (...args: any[]) => T
): MethodDecorator {
  const data = { constructor, caller: executeHandler };

  return metadata(HANDLER_KEY, data);
}

export interface IHandler<Param> {
  handle(param?: Param): Promise<void> | void;
}
