import { ComponentObserver } from "./component-observer";

export class AutoRunObserver extends ComponentObserver {
  protected get key(): string {
    return "AUTO_RUN";
  }

  protected registerJob(key: string, value: unknown) {
    const options = Object.assign(
      { name: `${Object.getPrototypeOf(this.component).name}#${key}` },
      value
    );

    const view = this.component[key].bind(this.component);

    return this.registerToExternalRegistry(view, options);
  }
}
