const storage = {};

function getId(target: any, propertyKey: string) {
  return `${target.name}#${propertyKey}`;
}

function defineMetadata(
  key: string,
  value: any,
  target: any,
  propertyKey: string
) {
  const id = getId(target, propertyKey);

  if (storage[key]) {
    storage[key][id] = value;
  } else {
    storage[key] = { [id]: value };
  }
}

function metadata(key: string, value: any) {
  return function (target: any, propertyKey: string) {
    defineMetadata(key, value, target, propertyKey);
  };
}

function hasMetadata(key: string, target: any, propertyKey: string) {
  const id = getId(target, propertyKey);

  return storage[key] && !!storage[key][id];
}

function getMetadata(key: string, target: any, propertyKey: string) {
  const id = getId(target, propertyKey);

  return storage[key] && storage[key][id];
}

export const Reflect = {
  defineMetadata,
  metadata,
  hasMetadata,
  getMetadata,
};
