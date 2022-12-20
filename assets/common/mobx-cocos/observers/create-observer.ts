import { AnyConstructor, Caller, DIContainer, Mobx } from "../interfaces";
import { createAutoRunRegistry } from "../registries/register-auto-run";
import { registerHandler } from "../registries/register-handler";
import { createReactionRegistry } from "../registries/register-reaction";
import { AutoRunObserver } from "./auto-run-observer";
import { HandlerObserver } from "./handler-observer";
import { IObserver } from "./observer";
import { ObserverManager } from "./observer-manager";
import { ReactionObserver } from "./reaction-observer";

function createMethodResolver(diContainer: DIContainer) {
  return (constructor: AnyConstructor, caller: Caller<unknown>) => {
    const instance = diContainer.resolve(constructor);

    return (...params: unknown[]) => caller(instance, ...params);
  };
}

export function createObserver(
  componentConstructor: AnyConstructor,
  componentInstance: unknown,
  mobx: Mobx,
  diContainer: DIContainer
): IObserver {
  const methodResolver = createMethodResolver(diContainer);

  const autoRun = new AutoRunObserver(
    componentConstructor,
    componentInstance,
    createAutoRunRegistry(mobx)
  );

  const reaction = new ReactionObserver(
    componentConstructor,
    componentInstance,
    createReactionRegistry(mobx),
    methodResolver
  );

  const handler = new HandlerObserver(
    componentConstructor,
    componentInstance,
    registerHandler,
    methodResolver
  );

  const manager = new ObserverManager([autoRun, reaction, handler]);

  return manager;
}
