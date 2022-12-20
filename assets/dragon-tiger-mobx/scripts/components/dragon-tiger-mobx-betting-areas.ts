import { Component, _decorator } from "cc";
import BettingArea from "../../../common/components/betting-area";
import { mobx } from "../../../common/external";
import { matchStore } from "../dragon-tiger-mobx-container";
import { DragonTigerChoice } from "../../../dragon-tiger/scripts/stores/dragon-tiger-match-store";

const { ccclass, property } = _decorator;
const { reaction } = mobx;

@ccclass
export class DragonTigerMobx extends Component {
  @property([BettingArea])
  protected bettingAreas: BettingArea[] = [];

  onLoad() {
    reaction(() => matchStore.totalBets, this.updateTotalBets.bind(this));
  }

  updateTotalBets(bets: DragonTigerChoice<number>) {
    this.bettingAreas.forEach((area) => {
      const key = area.key as any;

      if (bets[key]) {
        area.totalBet = `${bets[key]}`;
      }
    });
  }
}
