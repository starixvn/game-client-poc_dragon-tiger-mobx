import { Component, _decorator } from "cc";
import DTClient from "dragon-tiger-client/umd";
import { DragonTigerChoice } from "dragon-tiger-client/dist/stores";
import Observer from "observer";
import BettingArea from "../../common/components/betting-area";

const { ccclass, property } = _decorator;
const { render, observer } = Observer;
const { DragonTigerMatchStore } = DTClient;

@ccclass
@observer
export class DragonTigerBettingAreas extends Component {
  @property([BettingArea])
  protected bettingAreas: BettingArea[] = [];

  @render(DragonTigerMatchStore, (store) => store.totalBets)
  renderTotalBets(bets: DragonTigerChoice<number>) {
    this.bettingAreas.forEach((area) => {
      const key = area.key as any;

      if (bets[key]) {
        area.totalBet = `${bets[key]}`;
      }
    });
  }
}
