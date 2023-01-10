import { HANDLER_KEY, REACTION_KEY } from "../constants";
import { getNamespace, INamespace } from "../namespace";
import { createHandlerRegistry, createReactionRegistry } from "../registries";
import { ComponentObserver } from "./component-observer";
import { IObserver } from "./observer";
import { ObserverManager } from "./observer-manager";

export function createCCObserver(
  instance: unknown,
  namespace: INamespace
): IObserver {
  const addReaction = createReactionRegistry(namespace);
  const addHandler = createHandlerRegistry(namespace);

  const reaction = new ComponentObserver(instance, addReaction, REACTION_KEY);
  const handler = new ComponentObserver(instance, addHandler, HANDLER_KEY);

  return new ObserverManager([reaction, handler]);
}

export function createObserver(instance: unknown, namespaceKey: string) {
  const namespace = getNamespace(namespaceKey);

  return createCCObserver(instance, namespace);
}
