import { getMetadata, Metadata } from "../metadata-utils";
import { DisposableObserver, ObserverFn } from "./disposable-observer";

export class ComponentObserver extends DisposableObserver {
  constructor(
    protected readonly component: any,
    protected readonly register: (
      metadata: Metadata,
      component: any
    ) => ObserverFn,
    protected readonly key: string | symbol
  ) {
    super();

    const metadata = getMetadata(key, component);
    this.observers = metadata.map((data) => this.register(data, component));
  }
}
