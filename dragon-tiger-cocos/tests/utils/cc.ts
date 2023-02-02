export class Color {
  static WHITE = "WHITE";
}

export class Component {
  node: any;
}

export class Label {
  string: string;
  color: any;
}

export const _decorator = {
  ccclass: jest.fn(),
  property: jest.fn(),
};
