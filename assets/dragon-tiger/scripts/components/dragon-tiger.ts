import { Component, director, _decorator } from "cc";
import { observer, render } from "../../../common/mobx-cocos";
import { ServerSimulator } from "../../../server-simulator/components/server-simulator";
import { matchStore } from "../dragon-tiger-container";

const { ccclass } = _decorator;

@ccclass
@observer
export class DragonTiger extends Component {
  @render
  printRemainingTime() {
    const remainingTime = matchStore.remainingTime;

    console.log(remainingTime);
  }

  onLoad() {
    this.connectToSimulator();

    this.schedule(() => {
      matchStore.reduceRemainingTime();
    }, 1);
  }

  connectToSimulator() {
    const simulator = director
      .getScene()
      .getComponentInChildren(ServerSimulator);

    simulator.node.on("message", (data) => {
      if (data.remainingTime) {
        matchStore.setRemainingTime(data.remainingTime);
      }

      if (data.totalBets) {
        matchStore.totalBets = data.totalBets;
      }
    });
  }
}
