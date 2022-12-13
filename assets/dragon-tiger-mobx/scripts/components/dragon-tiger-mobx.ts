import { Color, Component, _decorator } from "cc";
import Timer from "../../../common/components/timer";
import { mobx } from "../../../common/external";
import { matchStore, uiStore } from "../dragon-tiger-mobx-container";

const { ccclass, property } = _decorator;
const { reaction, action } = mobx;

@ccclass
export class DragonTigerMobx extends Component {
  onLoad() {
    matchStore.setRemainingTime(36);

    setTimeout(() => {
      matchStore.result = {
        dragon: { card: 0, type: 0 },
        tiger: { card: 1, type: 2 },
      };
    }, 1000);
  }
}
