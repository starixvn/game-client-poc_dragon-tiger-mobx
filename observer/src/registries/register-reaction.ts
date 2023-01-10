import { Metadata } from "../metadata-utils";
import { INamespace } from "../namespace";
import { createResolver } from "./di-utils";

export function createReactionRegistry({ mobx, container }: INamespace) {
  const resolveMethod = createResolver(container);

  return function (metadata: Metadata, component: any) {
    const { constructor, caller } = metadata.value as any;
    const watch = resolveMethod(constructor, caller);
    const view = component[metadata.property].bind(component);
    const options = { fireImmediately: true, name: metadata.property };

    return () => mobx.reaction(watch, view, options);
  };
}
