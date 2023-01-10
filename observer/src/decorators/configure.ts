import { INamespace, setNamespace } from "../namespace";

export type IObserverOptions = Record<string | "default", INamespace>;

export function configure(options: IObserverOptions) {
  Object.entries(options).forEach(([name, value]) => setNamespace(name, value));
}
