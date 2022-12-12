import { Component, _decorator } from "cc";
import { mobx } from "../../../common/external";
import { matchStore } from "../dragon-tiger-mobx-container";

const { ccclass } = _decorator;
const { reaction, action } = mobx;

@ccclass
export class DragonTigerMobx extends Component {
  onLoad() {
    this.schedule(this.updateTimer.bind(this), 1);

    reaction(
      () => matchStore.remainingTime,
      this.onRemainingTimeUpdated.bind(this)
    );

    action((time: number) => {
      matchStore.remainingTime = time;
    })(36);
  }

  updateTimer() {
    matchStore.reduceRemainingTime();
  }

  onRemainingTimeUpdated(time: number) {
    console.log(time);
  }
}
