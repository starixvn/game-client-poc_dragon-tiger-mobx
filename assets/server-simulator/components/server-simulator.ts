import { Component, game, _decorator } from "cc";
import { mobx } from "../../common/external";
import { gameData } from "../server-simulator-container";

const { ccclass, property } = _decorator;
const { reaction } = mobx;

@ccclass
export class ServerSimulator extends Component {
  @property
  startRoundAt = 0;

  @property
  remainingTime = 36;

  firstLoad = true;

  onLoad() {
    gameData.initialize(this.remainingTime, this.startRoundAt);
    this.schedule(this.updatePerSecond.bind(this), 1);

    reaction(() => gameData.shouldSettle, this.settle.bind(this));
  }

  settle(shouldSettle: boolean) {
    if (shouldSettle) {
      gameData.settle();

      this.emit({ remainingTime: gameData.remainingTime });
    }
  }

  updatePerSecond() {
    gameData.countdown();

    if (this.firstLoad) {
      this.firstLoad = false;

      const payload = JSON.parse(JSON.stringify(gameData));

      this.emit(payload);
    }
  }

  emit(payload: unknown) {
    this.node.emit("message", payload);
  }
}
