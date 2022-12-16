import { Color, Component, _decorator } from "cc";
import Timer from "../../../common/components/timer";
import { observer, render } from "../../../common/mobx-cocos";
import { RemainingTimeWatcher } from "../watchers/remaining-time-watcher";
import { UIWatcher } from "../watchers/ui-watcher";

const { ccclass, property } = _decorator;

@ccclass
@observer
export class DragonTigerTimer extends Component {
  @property(Timer)
  protected timer: Timer = null;

  @render(RemainingTimeWatcher)
  onRemainingTimeUpdated(time: number) {
    this.timer!.text = (time || 0).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  }

  @render(UIWatcher, (watcher) => watcher.watchTimerColor())
  changeTimerColor(color: Color) {
    this.timer!.color = color;
  }

  @render(UIWatcher, (watcher) => watcher.watchIsWaitingTime())
  toggleTimer(hide: boolean) {
    this.timer.node.active = !hide;
  }
}
