import { AnyConstructor, Caller } from "../interfaces";
import { ComponentObserver } from "./component-observer";

export type WatcherMethod = (
  constructor: AnyConstructor,
  caller: Caller<unknown>
) => unknown;

export class ReactionObserver extends ComponentObserver {
  constructor(
    component: any,
    registerToExternalRegistry: any,
    protected readonly getWatcherMethod: WatcherMethod
  ) {
    super(component, registerToExternalRegistry);
  }

  protected get key(): string {
    return "REACTION";
  }

  protected registerJob(key: string, value: any) {
    const view = this.component[key].bind(this.component);
    const options = Object.assign(
      {
        name: `${Object.getPrototypeOf(this.component).name}#${key}`,
      },
      { fireImmediately: true },
      value.options
    );
    const watch = this.getWatcherMethod(value.constructor, value.caller);

    return this.registerToExternalRegistry(watch, view, options);
  }
}
