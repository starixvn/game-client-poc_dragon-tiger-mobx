import { AnyFunction } from "../interfaces";

function createNewComponentFn(handler: any, componentFn: AnyFunction) {
  const executeHandler = (data: unknown) => {
    handler(data);

    return data;
  };

  return (...params: unknown[]) => {
    const response = componentFn(...params);
    const isPromise =
      typeof response === "object" && typeof response.then === "function";

    return isPromise ? response.then(executeHandler) : executeHandler(response);
  };
}

export function registerHandler(
  handler: any,
  component: unknown,
  options: {
    name: string;
  }
) {
  const { name } = options;
  const componentFn = component[name].bind(component);
  const newComponentFn = createNewComponentFn(handler, componentFn);

  component[name] = newComponentFn;

  return () => {
    component[name] = componentFn;
  };
}
