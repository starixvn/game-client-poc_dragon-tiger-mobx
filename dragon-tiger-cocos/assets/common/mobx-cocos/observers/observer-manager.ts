import { IObserver } from "./observer";

export class ObserverManager implements IObserver {
  constructor(protected readonly observers: IObserver[]) {}

  observe(): void {
    this.observers.forEach((observer) => observer.observe());
  }

  dispose(): void {
    this.observers.forEach((observer) => observer.dispose());
  }
}
