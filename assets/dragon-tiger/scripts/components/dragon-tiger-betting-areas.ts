import { Component, _decorator } from "cc";
import BettingArea from "../../../common/components/betting-area";
import { mobx } from "../../../common/external";
import { render } from "../../../common/mobx-cocos";
import { DragonTigerChoice } from "../stores/dragon-tiger-match-store";
import { TotalBetsWatcher } from "../watchers/total-bets-watcher";

const { ccclass, property } = _decorator;
const { reaction } = mobx;

@ccclass
export class DragonTigerBettingAreas extends Component {
  @property([BettingArea])
  protected bettingAreas: BettingArea[] = [];

  @render(TotalBetsWatcher)
  renderTotalBets(bets: DragonTigerChoice<number>) {
    this.bettingAreas.forEach((area) => {
      const key = area.key as any;

      if (bets[key]) {
        area.totalBet = `${bets[key]}`;
      }
    });
  }
}
