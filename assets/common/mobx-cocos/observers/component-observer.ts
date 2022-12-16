import { IObserver } from "./observer";

type Disposer = () => void;
type RegisterJob = (...params: unknown[]) => Disposer;

export abstract class ComponentObserver implements IObserver {
  protected disposers: Disposer[] = [];

  constructor(
    protected readonly component: any,
    protected readonly registerToExternalRegistry: RegisterJob
  ) {}

  protected abstract get key(): string;

  protected abstract registerJob(key: string, value: unknown): Disposer;

  public observe(): void {
    this.properties.forEach((property) => {
      const disposer = this.registerJob(property.name, property.value);

      this.disposers.push(disposer);
    });
  }

  public dispose(): void {
    if (this.disposers.length) {
      this.disposers.splice(0).forEach((dispose) => dispose());
    }
  }

  protected get properties() {
    return this.getAllComponentMethods()
      .filter((property) =>
        Reflect.hasMetadata(this.key, this.component, property)
      )
      .map((property) => ({
        name: property,
        value: Reflect.getMetadata(this.key, this.component, property),
      }));
  }

  protected getAllComponentMethods() {
    const prototypes = this.getAllPrototypes(this.component);

    const methods = prototypes
      .flatMap((prototype) => Object.getOwnPropertyNames(prototype))
      .filter((name) => typeof this.component[name] === "function");

    return [...new Set(methods)];
  }

  protected getAllPrototypes(object: unknown) {
    const prototypes = [];

    let prototype = Object.getPrototypeOf(object);

    while (prototype) {
      prototypes.push(prototype);

      prototype = Object.getPrototypeOf(prototype);
    }

    return prototypes;
  }
}
