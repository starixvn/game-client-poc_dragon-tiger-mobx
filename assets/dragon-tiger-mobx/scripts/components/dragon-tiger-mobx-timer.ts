import { Color, Component, _decorator } from "cc";
import Timer from "../../../common/components/timer";
import { mobx } from "../../../common/external";
import { matchStore, uiStore } from "../dragon-tiger-mobx-container";

const { ccclass, property } = _decorator;
const { reaction } = mobx;

@ccclass
export class DragonTigerMobxTimer extends Component {
  @property(Timer)
  protected timer: Timer = null;

  onLoad() {
    this.schedule(this.updateTimer.bind(this), 1);

    reaction(
      () => matchStore.remainingTime,
      this.onRemainingTimeUpdated.bind(this)
    );

    reaction(() => uiStore.timerColor, this.changeTimerColor.bind(this));
    reaction(() => uiStore.isWaitingTime, this.toggleTimer.bind(this));
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

  toggleTimer(hide: boolean) {
    this.timer.node.active = !hide;
  }
}
