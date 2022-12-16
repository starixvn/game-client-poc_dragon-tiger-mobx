import { AnyConstructor, Caller } from "../interfaces";
import { ComponentObserver } from "./component-observer";

export type WatcherMethod = (
  constructor: AnyConstructor,
  caller: Caller<unknown>
) => unknown;

export class ReactionObserver extends ComponentObserver {
  constructor(
    componentConstructor: AnyConstructor,
    componentInstance: any,
    registerToExternalRegistry: any,
    protected readonly getWatcherMethod: WatcherMethod
  ) {
    super(componentConstructor, componentInstance, registerToExternalRegistry);
  }

  protected get key(): string {
    return "REACTION";
  }

  protected registerJob(key: string, value: any) {
    const view = this.componentInstance[key].bind(this.componentInstance);
    const options = Object.assign(
      {
        name: `${this.componentConstructor.name}#${key}`,
      },
      { fireImmediately: true },
      value.options
    );
    const watch = this.getWatcherMethod(value.constructor, value.caller);

    return this.registerToExternalRegistry(watch, view, options);
  }
}
