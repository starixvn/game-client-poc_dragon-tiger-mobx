import { AnyConstructor, Caller } from "../interfaces";
import { ComponentObserver } from "./component-observer";

export type HandlerMethod = (
  constructor: AnyConstructor,
  caller: Caller<unknown>
) => any;

export class HandlerObserver extends ComponentObserver {
  private observed = false;

  constructor(
    componentConstructor: AnyConstructor,
    componentInstance: any,
    registerToExternalRegistry: any,
    protected readonly getHandleMethod: HandlerMethod
  ) {
    super(componentConstructor, componentInstance, registerToExternalRegistry);

    this.observe();
  }

  protected get key(): string {
    return "HANDLER";
  }

  protected registerJob(key: string, value: any) {
    const handle = this.getHandleMethod(value.constructor, value.caller);

    return this.registerToExternalRegistry(handle, this.componentInstance, key);
  }

  public observe(): void {
    if (!this.observed) {
      this.observed = true;

      super.observe();
    }
  }
}
