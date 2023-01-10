import {
  Component,
  instantiate,
  Node,
  Prefab,
  UITransform,
  _decorator,
} from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class HistoryChainContainer extends Component {
  @property(Node)
  protected container: Node = null;

  @property(Prefab)
  protected itemPrefab: Prefab = null;

  @property
  protected size = 20;

  config(size: number) {
    this.size = size;
  }

  render(nodes: Node[]) {
    this.fifo(...nodes);
  }

  fifo(...nodes: Node[]) {
    const additionNodes =
      nodes.length > this.size
        ? [...nodes].slice(nodes.length - this.size)
        : nodes;

    const currentChildren = this.container.children.length;
    const totalChildren = currentChildren + additionNodes.length;
    const shouldRemoveOldNodes = totalChildren > this.size;

    if (shouldRemoveOldNodes) {
      const numbersOfRemoval = totalChildren - this.size;
      const removalNodes = this.container.children.slice(0, numbersOfRemoval);

      removalNodes.forEach((node) => node.removeFromParent());
    }

    additionNodes.forEach((node) => {
      const newNode = this.createNode(node);

      this.container.addChild(newNode);
    });

    this.container.children.map((container, index, nodes) => {
      container.children.forEach((node) => {
        node.emit("children:updated", index, nodes.length);
      });
    });
  }

  protected createNode(node: Node) {
    const container = instantiate(this.itemPrefab);
    const ui = container.getComponent(UITransform);
    const nodeUI = node.getComponent(UITransform);

    container.addChild(node);

    if (nodeUI) {
      ui.setContentSize(nodeUI.contentSize.clone());
    }

    return container;
  }
}
