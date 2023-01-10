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
    const options = { name: key };

    return this.registerToExternalRegistry(
      handle,
      this.componentInstance,
      options
    );
  }

  /**
   * This observer will be wrapped in some method of the component,
   * so we only want it to observe only once.
   */
  public observe(): void {
    if (!this.observed) {
      this.observed = true;

      super.observe();
    }
  }
}
