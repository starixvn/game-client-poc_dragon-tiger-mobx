import { Component, _decorator } from "cc";
import HistoryChainManager from "../../../common/components/history-chain-manager";
import { matchStore } from "../dragon-tiger-mobx-container";

const { ccclass, property } = _decorator;

@ccclass
export class DragonTigerMobx extends Component {
  @property(HistoryChainManager)
  protected historyChain: HistoryChainManager = null;

  onLoad() {
    matchStore.setRemainingTime(36);

    setTimeout(() => {
      matchStore.result = {
        dragon: { card: 0, type: 0 },
        tiger: { card: 1, type: 2 },
      };
    }, 1000);

    this.schedule(this.simulateHistoryChain.bind(this), 2);
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
}
