import { Component, _decorator, Node } from "cc";
import DTClient from "dragon-tiger-client/umd";
import { DragonTigerChoice } from "dragon-tiger-client/dist/stores";
import Observer from "observer";
import BettingArea from "../../common/components/betting-area";

const { ccclass, property } = _decorator;
const { render, observer, handle } = Observer;
const { DragonTigerMatchStore, BetHandler } = DTClient;

@ccclass
@observer
export class DragonTigerBettingAreas extends Component {
  @property([BettingArea])
  protected bettingAreas: BettingArea[] = [];

  onLoad() {
    this.eachArea((area) => {
      area.node.on(Node.EventType.TOUCH_END, () =>
        this.placeBet(area.key as string)
      );
    });
  }

  @render(DragonTigerMatchStore, (store) => store.totalBets)
  renderTotalBets(bets: DragonTigerChoice<number>) {
    this.eachArea((area) => {
      const key = area.key as any;

      if (bets[key]) {
        area.totalBet = `${bets[key]}`;
      }
    });
  }

  @render(DragonTigerMatchStore, (store) => store.ownBets)
  renderOwnBets(bets: DragonTigerChoice<number>) {
    this.eachArea((area) => {
      const key = area.key as any;

      if (bets[key]) {
        area.ownBet = `${bets[key]}`;
      }
    });
  }

  @handle(BetHandler)
  placeBet(choice: string) {
    return { [choice]: 100 };
  }

  protected eachArea(callback: (area: BettingArea) => void) {
    this.bettingAreas.forEach(callback);
  }
}
