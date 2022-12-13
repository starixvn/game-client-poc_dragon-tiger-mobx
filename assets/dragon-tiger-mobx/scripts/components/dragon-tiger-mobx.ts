import { Color, Component, _decorator } from "cc";
import Timer from "../../../common/components/timer";
import { mobx } from "../../../common/external";
import { matchStore, uiStore } from "../dragon-tiger-mobx-container";

const { ccclass, property } = _decorator;
const { reaction, action } = mobx;

@ccclass
export class DragonTigerMobx extends Component {
  @property(Timer)
  protected timer: Timer = null;

  onLoad() {
    this.schedule(this.updateTimer.bind(this), 1);

    reaction(
      () => matchStore.remainingTime,
      this.onRemainingTimeUpdated.bind(this)
    );

    reaction(() => uiStore.timerColor, this.changeTimerColor.bind(this));

    matchStore.setRemainingTime(36);
  }

  updateTimer() {
    matchStore.reduceRemainingTime();
  }

  onRemainingTimeUpdated(time: number) {
    this.timer!.text = time.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  }

  changeTimerColor(color: Color) {
    this.timer!.color = color;
  }
}
