import { inversify } from "../../../common/external";
import { IWatcher } from "../../../common/mobx-cocos";
import {
  DragonTigerChoice,
  DragonTigerMatchStore,
} from "../stores/dragon-tiger-match-store";

const { inject, injectable } = inversify;

@injectable()
export class TotalBetsWatcher implements IWatcher<DragonTigerChoice<number>> {
  @inject(DragonTigerMatchStore)
  match: DragonTigerMatchStore;

  watch(): DragonTigerChoice<number> {
    return this.match.totalBets;
  }
}
