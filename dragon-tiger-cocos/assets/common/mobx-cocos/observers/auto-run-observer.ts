import { ComponentObserver } from "./component-observer";

export class AutoRunObserver extends ComponentObserver {
  protected get key(): string {
    return "AUTO_RUN";
  }

  protected registerJob(key: string, value: unknown) {
    const options = Object.assign(
      { name: `${this.componentConstructor.name}#${key}` },
      value
    );

    const view = this.componentInstance[key].bind(this.componentInstance);

    return this.registerToExternalRegistry(view, options);
  }
}
