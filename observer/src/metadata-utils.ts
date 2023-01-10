import { METADATA_KEY } from "./constants";

export interface Metadata {
  property: string;
  key: string | symbol;
  value: unknown;
}

export function hasMetadata(prototype: object) {
  return !prototype || !!prototype[METADATA_KEY];
}

export function getPrototype(object: Object) {
  let prototype = Object.getPrototypeOf(object);

  while (!hasMetadata(prototype)) {
    prototype = Object.getPrototypeOf(prototype);
  }

  return prototype;
}

export function getMetadata(key: string | symbol, object: Object) {
  const ctor = getPrototype(object);
  const metadata = ((ctor && ctor[METADATA_KEY]) ?? []) as Metadata[];

  return metadata.filter((metadata) => metadata.key === key);
}

export function metadata(key: string | symbol, value: unknown) {
  return function (target: unknown, property: string) {
    const metadata: Metadata = { key, value, property };

    if (target[METADATA_KEY]) {
      target[METADATA_KEY].push(metadata);
    } else {
      target[METADATA_KEY] = [metadata];
    }
  };
}
