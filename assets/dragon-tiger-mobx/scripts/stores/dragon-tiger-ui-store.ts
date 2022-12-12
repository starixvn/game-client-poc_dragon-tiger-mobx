import { inversify, mobx } from "../../../common/external";
import { DragonTigerConfigsStore } from "./dragon-tiger-configs-store";
import { DragonTigerMatchStore } from "./dragon-tiger-match-store";

const { observable, makeObservable, computed } = mobx;
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
}
