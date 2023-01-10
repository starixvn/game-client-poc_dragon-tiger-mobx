import { Component, _decorator } from "cc";
import { mobx } from "../../common/external";
import { gameData } from "../server-simulator-container";

const { ccclass, property } = _decorator;
const { when } = mobx;

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

    when(() => gameData.shouldSettle, this.settle.bind(this));
  }

  settle() {
    gameData.settle();

    this.emit({ remainingTime: gameData.remainingTime });
    when(() => gameData.shouldSettle, this.settle.bind(this));
  }

  updatePerSecond() {
    gameData.countdown();

    if (this.firstLoad) {
      this.firstLoad = false;

      const payload = JSON.parse(JSON.stringify(gameData));

      this.emit(payload);
    }

    gameData.fakeData();
    this.sendMessagePerSecond();
  }

  sendMessagePerSecond() {
    const payload = {
      totalBets: JSON.parse(JSON.stringify(gameData.totalBets)),
    };

    this.emit(payload);
  }

  emit(payload: unknown) {
    this.node.emit("message", payload);
  }
}
