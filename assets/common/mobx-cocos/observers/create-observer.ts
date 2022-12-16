import { AnyConstructor, Caller, DIContainer, Mobx } from "../interfaces";
import { AutoRunObserver } from "./auto-run-observer";
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

export function createObserver(
  component: unknown,
  mobx: Mobx,
  diContainer: DIContainer
): IObserver {
  const autoRun = new AutoRunObserver(component, mobx.autorun);
  const reaction = new ReactionObserver(
    component,
    mobx.reaction,
    getMethodFromConstructor(diContainer)
  );

  const manager = new ObserverManager([autoRun, reaction]);

  return manager;
}
