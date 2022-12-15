import {
  CCString,
  Color,
  Component,
  Label,
  Node,
  Sprite,
  _decorator,
} from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class BettingArea extends Component {
  @property(Label)
  protected total: Label = null;

  @property(Label)
  protected own: Label = null;

  @property(Node)
  protected winning: Node = null;

  @property(CCString)
  readonly key: String = "";

  @property
  get highlight() {
    return this.winning!.active;
  }

  set highlight(value: boolean) {
    this.winning!.active = value;
  }

  @property
  get totalBet() {
    return this.total!.string;
  }

  set totalBet(value: string) {
    this.total!.string = value;
  }

  @property
  get ownBet() {
    return this.own!.string;
  }

  set ownBet(value: string) {
    this.own!.string = value;
  }
}
