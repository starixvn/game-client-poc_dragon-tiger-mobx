import { Metadata } from "../metadata-utils";
import { INamespace } from "../namespace";
import { createResolver } from "./di-utils";

export function isPromise(object: Promise<any>) {
  return typeof object?.then === "function";
}

function createNewComponentFn(handler: any, componentFn: any) {
  const executeHandler = (data: unknown) => {
    handler(data);

    return data;
  };

  return (...params: unknown[]) => {
    const response = componentFn(...params);

    return isPromise(response)
      ? response.then(executeHandler)
      : executeHandler(response);
  };
}

function setProperty(object: unknown, name: string, value: unknown) {
  object[name] = value;
}

export function createHandlerRegistry({ container }: INamespace) {
  const resolveMethod = createResolver(container);

  return function (metadata: Metadata, component: any) {
    const { constructor, caller } = metadata.value as any;
    const property = metadata.property;
    const handler = resolveMethod(constructor, caller);
    const componentFn = component[property].bind(component);
    const newComponentFn = createNewComponentFn(handler, componentFn);

    setProperty(component, property, newComponentFn);

    return () => () => setProperty(component, property, componentFn);
  };
}
