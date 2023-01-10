const data: { namespaces: Record<string, INamespace> } = {
  namespaces: {
    default: { mobx: null, container: null },
  },
};

export interface INamespace {
  container?: any;

  mobx?: any;
}

export function getNamespace(key: string) {
  return data.namespaces[key];
}

export function setNamespace(name: string, value: INamespace) {
  data.namespaces[name] = value;
}
