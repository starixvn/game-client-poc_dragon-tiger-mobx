import { Component, _decorator } from "cc";
import Card from "../../../common/components/card";
import { mobx } from "../../../common/external";
import { uiStore } from "../dragon-tiger-mobx-container";
import { DragonTigerChoice } from "../stores/dragon-tiger-match-store";

const { ccclass, property } = _decorator;
const { reaction } = mobx;

@ccclass
export class DragonTigerMobxCards extends Component {
  @property(Card)
  protected dragon: Card = null;

  @property(Card)
  protected tiger: Card = null;

  onLoad() {
    reaction(() => uiStore.cards, this.renderCards.bind(this));
  }

  renderCards(cards: DragonTigerChoice<number>) {
    this.dragon.value = cards.dragon;
    this.tiger.value = cards.tiger;
  }
}
