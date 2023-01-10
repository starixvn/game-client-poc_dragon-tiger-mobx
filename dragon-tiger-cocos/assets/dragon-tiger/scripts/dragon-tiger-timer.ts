import { Color, Component, _decorator } from "cc";
import DTClient from "dragon-tiger-client";
import Observer from "observer";
import Timer from "../../common/components/timer";

const { ccclass, property } = _decorator;
const { observer, render } = Observer;
const { RemainingTimeWatcher, UIWatcher } = DTClient;

@ccclass
@observer
export class DragonTigerTimer extends Component {
  @property(Timer)
  protected timer: Timer = null;

  @render(RemainingTimeWatcher)
  onRemainingTimeUpdated(remainingTime: number) {
    const options = { minimumIntegerDigits: 2 };
    const timeInString = (remainingTime || 0).toLocaleString("en-US", options);

    this.timer!.text = timeInString;
  }

  @render(UIWatcher, (watcher) => watcher.watchTimerColor())
  changeTimerColor(color: string) {
    this.timer!.color = Color[color];
  }

  @render(UIWatcher, (watcher) => watcher.watchIsWaitingTime())
  toggleTimer(hide: boolean) {
    this.timer.node.active = !hide;
  }
}
