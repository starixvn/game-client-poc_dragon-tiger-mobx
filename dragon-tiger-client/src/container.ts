import { createInjector, Injector, Scope } from "typed-inject";
import { Dependencies } from "./container-registry";

function getToken(ctor: any) {
  return typeof ctor === "string" ? ctor : ctor.token;
}

function createAppInjector(rootInjector: Injector) {
  const injector = Dependencies.reduce((injector, { ctor, inject, token }) => {
    Object.defineProperty(ctor, "inject", {
      value: inject.map(getToken),
    });

    Object.defineProperty(ctor, "token", {
      value: token,
    });

    return injector.provideClass(getToken(ctor), ctor as any, Scope.Singleton);
  }, rootInjector);

  Dependencies.forEach(({ ctor }) => {
    injector.injectClass(ctor as any);
  });

  return injector;
}

export interface ContainerOptions {
  makeObservable(...params: any[]): any;
}

export function createContainer(options: ContainerOptions) {
  const root = createInjector().provideValue(
    "makeObservable",
    options.makeObservable
  );

  const injector = createAppInjector(root);

  function resolve<T>(ctor: new (...params: any[]) => T): T {
    return injector.resolve((ctor as any).token as never);
  }

  return { resolve };
}
