import { AnyConstructor, Caller, DIContainer, Mobx } from "../interfaces";
import { AutoRunObserver } from "./auto-run-observer";
import { HandlerObserver } from "./handler-observer";
import { IObserver } from "./observer";
import { ObserverManager } from "./observer-manager";
import { ReactionObserver } from "./reaction-observer";

function getMethodFromConstructor(diContainer: DIContainer) {
  return (constructor: AnyConstructor, caller: Caller<unknown>) => {
    const instance = diContainer.resolve(constructor);
    const method = (...params: unknown[]) => caller(instance, ...params);

    return method;
  };
}

function registerHandler(handle: any, component: unknown, name: string) {
  const componentFn = component[name].bind(component);
  const newComponentFn = (...params: unknown[]) => {
    const response = componentFn(...params);

    handle(response);

    return response;
  };

  component[name] = newComponentFn;

  return () => {
    component[name] = componentFn;
  };
}

export function createObserver(
  componentConstructor: AnyConstructor,
  componentInstance: unknown,
  mobx: Mobx,
  diContainer: DIContainer
): IObserver {
  const autoRun = new AutoRunObserver(
    componentConstructor,
    componentInstance,
    mobx.autorun
  );
  const reaction = new ReactionObserver(
    componentConstructor,
    componentInstance,
    mobx.reaction,
    getMethodFromConstructor(diContainer)
  );
  const handler = new HandlerObserver(
    componentConstructor,
    componentInstance,
    registerHandler,
    getMethodFromConstructor(diContainer)
  );

  const manager = new ObserverManager([autoRun, reaction, handler]);

  return manager;
}
