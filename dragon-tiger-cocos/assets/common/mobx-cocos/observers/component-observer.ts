import { IObserver } from "./observer";
import { Reflect } from "../reflect-metadata";
import { AnyConstructor } from "../interfaces";

type Disposer = () => void;
type RegisterJob = (...params: unknown[]) => Disposer;

export abstract class ComponentObserver implements IObserver {
  protected disposers: Disposer[] = [];

  constructor(
    protected readonly componentConstructor: AnyConstructor,
    protected readonly componentInstance: any,
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
    const methods = this.getAllComponentMethods();
    const properties = methods
      .filter((property) =>
        Reflect.hasMetadata(this.key, this.componentConstructor, property)
      )
      .map((property) => ({
        name: property,
        value: Reflect.getMetadata(
          this.key,
          this.componentConstructor,
          property
        ),
      }));

    return properties;
  }

  protected getAllComponentMethods() {
    const prototypes = ComponentObserver.getAllPrototypes(this.componentInstance);

    const methods = prototypes
      .flatMap((prototype) => Object.getOwnPropertyNames(prototype))
      .filter((name) => typeof this.componentInstance[name] === "function");
    const setOfMethods = new Set(methods);

    return Array.from(setOfMethods);
  }

  protected static getAllPrototypes(object: unknown) {
    const prototypes = [];

    let prototype = Object.getPrototypeOf(object);

    while (prototype) {
      prototypes.push(prototype);

      prototype = Object.getPrototypeOf(prototype);
    }

    return prototypes;
  }
}
