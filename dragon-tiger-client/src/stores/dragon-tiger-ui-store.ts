import { makeAutoObservable } from "mobx";
import { DragonTigerConfigsStore } from "./dragon-tiger-configs-store";
import {
  DragonTigerChoice,
  DragonTigerMatchStore,
} from "./dragon-tiger-match-store";

export class DragonTigerUIStore {
  constructor(
    protected readonly match: DragonTigerMatchStore,
    protected readonly configs: DragonTigerConfigsStore
  ) {
    makeAutoObservable(this);
  }

  get isWaitingTime() {
    const durationConfigs = this.configs.durationConfigs;
    const waitingAt = durationConfigs.whole - durationConfigs.waiting;

    return this.match.remainingTime > waitingAt;
  }

  get isLockingTime() {
    const durationConfigs = this.configs.durationConfigs;

    return this.match.remainingTime <= durationConfigs.locking;
  }

  get timerColor() {
    if (this.isLockingTime) {
      return "RED";
    } else {
      return "WHITE";
    }
  }

  get cards(): DragonTigerChoice<number> {
    if (this.match.result) {
      const defaultCard = { type: -1, card: -1 };
      const dragon = this.match.result.dragon ?? defaultCard;
      const tiger = this.match.result.tiger ?? defaultCard;

      return {
        dragon: 13 * dragon.type + dragon.card,
        tiger: 13 * tiger.type + tiger.card,
      };
    } else {
      return { dragon: -1, tiger: -1 };
    }
  }
}
