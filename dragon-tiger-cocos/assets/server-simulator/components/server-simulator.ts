import { Component, _decorator } from "cc";
import { rounds } from "../data/rounds";

const { ccclass, property } = _decorator;

@ccclass
export class ServerSimulator extends Component {
  @property
  roundId = 0;

  remainingTime = 36;

  totalBets = {
    dragon: 0,
    tiger: 0,
    tie: 0,
  };

  onLoad() {
    this.schedule(() => {
      this.reset();
      this.emitRoundResult();
      this.emitRemainingTime();
    }, this.remainingTime);

    this.schedule(() => {
      this.emitTotalBets();
    }, 1);
  }

  onEnable() {
    this.emit({ remainingTime: this.remainingTime });
  }

  reset() {
    this.totalBets = {
      dragon: 0,
      tiger: 0,
      tie: 0,
    };
  }

  emitTotalBets() {
    const random = () => (Math.random() * 100) >> 0;
    this.totalBets = {
      dragon: this.totalBets.dragon + random(),
      tiger: this.totalBets.tiger + random(),
      tie: this.totalBets.tie + random(),
    };

    this.emit({ totalBets: this.totalBets });
  }

  emitRemainingTime() {
    this.emit({ remainingTime: this.remainingTime });
  }

  emitRoundResult() {
    this.emit(rounds[this.roundId]);
    this.roundId = this.roundId + 1;
  }

  emit(payload: unknown) {
    this.node.emit("message", payload);
  }
}
