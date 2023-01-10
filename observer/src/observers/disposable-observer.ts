import { IObserver } from "./observer";

export type DisposerFn = () => void;

export type ObserverFn = () => DisposerFn;

export class DisposableObserver implements IObserver {
  protected disposers: DisposerFn[] = [];

  protected observers: ObserverFn[] = [];

  observe(): void {
    this.observers.forEach((observe) => {
      const disposer = observe();

      this.disposers.push(disposer);
    });
  }

  dispose(): void {
    this.disposers.splice(0).forEach((dispose) => dispose());
  }
}
