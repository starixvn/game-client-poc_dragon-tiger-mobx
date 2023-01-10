import { Component, instantiate, Node, Prefab, _decorator } from "cc";
import HistoryChainContainer from "./history-chain-container";
import HistoryChainItem from "./history-chain-item";

const { ccclass, property } = _decorator;

@ccclass
export default class HistoryChainManager extends Component {
  @property(HistoryChainContainer)
  protected container: HistoryChainContainer = null;

  @property(Prefab)
  protected item: Prefab = null;

  config(size: number) {
    this.container!.config(size);
  }

  render<T>(values: T[]) {
    const nodes = values.map((value) => this.createNode(value));

    this.container!.render(nodes);
  }

  fifo<T>(value: T) {
    const node = this.createNode(value);

    this.container!.fifo(node);
  }

  protected createNode<T>(value: T): Node {
    const node = instantiate(this.item);

    const component = node.getComponent(HistoryChainItem);

    component.setValue(value);

    return node;
  }
}
