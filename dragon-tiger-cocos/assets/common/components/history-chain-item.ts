import { Component, Node, _decorator } from "cc";

const { ccclass } = _decorator;

@ccclass
export default class HistoryChainItem<T> extends Component {
  setValue(value: T) {}

  onUpdated(index: number, size: number) {}

  onLoad() {
    this.node.on("children:updated", this.onUpdated.bind(this));
  }
}
