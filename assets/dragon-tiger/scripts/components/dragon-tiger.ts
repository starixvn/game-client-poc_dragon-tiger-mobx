import { Component, _decorator } from "cc";
import { handle, observer } from "../../../common/mobx-cocos";
import { ConnectToSimulator } from "../handlers/connect-to-simulator";
import { ReduceRemainingTime } from "../handlers/reduce-remaining-time";

const { ccclass } = _decorator;

@ccclass
@observer
export class DragonTiger extends Component {
  @handle(ConnectToSimulator)
  onLoad() {
    this.schedule(this.reduceRemainingTime, 1);
  }

  @handle(ReduceRemainingTime)
  reduceRemainingTime() {}
}
