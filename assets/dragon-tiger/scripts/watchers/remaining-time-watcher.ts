import { inversify } from "../../../common/external";
import { IWatcher } from "../../../common/mobx-cocos";
import {
  DragonTigerChoice,
  DragonTigerMatchStore,
} from "../../../dragon-tiger-mobx/scripts/stores/dragon-tiger-match-store";

const { inject, injectable } = inversify;

@injectable()
export class RemainingTimeWatcher implements IWatcher<number> {
  @inject(DragonTigerMatchStore)
  match: DragonTigerMatchStore;

  watch(): number {
    return this.match.remainingTime;
  }
}
