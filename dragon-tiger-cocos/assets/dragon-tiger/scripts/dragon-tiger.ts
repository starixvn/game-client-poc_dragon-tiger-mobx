import "./dragon-tiger-startup";
import { Component, _decorator } from "cc";
import DTClient from "dragon-tiger-client";
import Observer from "observer";

const { ccclass } = _decorator;
const { observer, handle } = Observer;
const { ReduceRemainingTime } = DTClient;

@ccclass
@observer
export class DragonTiger extends Component {
  onLoad() {
    this.schedule(this.reduceRemainingTime, 1);
  }

  @handle(ReduceRemainingTime)
  reduceRemainingTime() {}
}
