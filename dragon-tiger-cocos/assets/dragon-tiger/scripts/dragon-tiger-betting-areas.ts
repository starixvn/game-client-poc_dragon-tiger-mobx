import { Component, _decorator } from "cc";
import DTClient from "dragon-tiger-client";
import { DragonTigerChoice } from "dragon-tiger-client/dist/stores";
import Observer from "observer";
import BettingArea from "../../common/components/betting-area";

const { ccclass, property } = _decorator;
const { render } = Observer;
const { MatchWatcher } = DTClient;

@ccclass
export class DragonTigerBettingAreas extends Component {
  @property([BettingArea])
  protected bettingAreas: BettingArea[] = [];

  @render(MatchWatcher, (watcher) => watcher.watchTotalBets())
  renderTotalBets(bets: DragonTigerChoice<number>) {
    this.bettingAreas.forEach((area) => {
      const key = area.key as any;

      if (bets[key]) {
        area.totalBet = `${bets[key]}`;
      }
    });
  }
}
