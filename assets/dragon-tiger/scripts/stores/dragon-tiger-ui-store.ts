import { Color } from "cc";
import { inversify, mobx } from "../../../common/external";
import { DragonTigerConfigsStore } from "./dragon-tiger-configs-store";
import {
  DragonTigerChoice,
  DragonTigerMatchStore
} from "./dragon-tiger-match-store";

const { makeObservable, computed } = mobx;
const { injectable, inject } = inversify;

@injectable()
export class DragonTigerUIStore {
  @inject(DragonTigerMatchStore)
  match: DragonTigerMatchStore;

  @inject(DragonTigerConfigsStore)
  configs: DragonTigerConfigsStore;

  constructor() {
    makeObservable(this);
  }

  @computed
  get isWaitingTime() {
    const durationConfigs = this.configs.durationConfigs;
    const waitingAt = durationConfigs.whole - durationConfigs.waiting;

    return this.match.remainingTime > waitingAt;
  }

  @computed
  get isLockingTime() {
    const durationConfigs = this.configs.durationConfigs;

    return this.match.remainingTime <= durationConfigs.locking;
  }

  @computed
  get timerColor() {
    if (this.isLockingTime) {
      return Color.RED;
    } else {
      return Color.WHITE;
    }
  }

  @computed
  get cards(): DragonTigerChoice<number> {
    if (this.match.result) {
      const dragon = this.match.result.dragon;
      const tiger = this.match.result.tiger;

      return {
        dragon: 13 * dragon.type + dragon.card,
        tiger: 13 * tiger.type + tiger.card,
      };
    } else {
      return { dragon: -1, tiger: -1 };
    }
  }
}
