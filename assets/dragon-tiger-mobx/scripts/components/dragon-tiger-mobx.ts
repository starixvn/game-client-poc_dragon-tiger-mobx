import { Component, director, sys, _decorator } from "cc";
import HistoryChainManager from "../../../common/components/history-chain-manager";
import { ServerSimulator } from "../../../server-simulator/components/server-simulator";
import { matchStore } from "../dragon-tiger-mobx-container";

const { ccclass, property } = _decorator;

@ccclass
export class DragonTigerMobx extends Component {
  @property(HistoryChainManager)
  protected historyChain: HistoryChainManager = null;

  onLoad() {
    this.connectToSimulator();
  }

  simulateHistoryChain() {
    const random = this.getRandomIntInclusive(1, 3);
    const result = {
      dragon: random === 1,
      tiger: random === 2,
      tie: random === 3,
    };

    this.historyChain!.fifo(result);
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  connectToSimulator() {
    const simulator = director
      .getScene()
      .getComponentInChildren(ServerSimulator);

    simulator.node.on("message", (data) => {
      if (data.remainingTime) {
        matchStore.setRemainingTime(data.remainingTime);
      }
    });
  }
}
