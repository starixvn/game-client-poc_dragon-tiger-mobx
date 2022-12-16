import { Color } from "cc";
import { inversify } from "../../../common/external";
import { DragonTigerUIStore } from "../../../dragon-tiger-mobx/scripts/stores/dragon-tiger-ui-store";

const { inject, injectable } = inversify;

@injectable()
export class UIWatcher {
  @inject(DragonTigerUIStore)
  protected ui: DragonTigerUIStore;

  watchTimerColor(): Color {
    return this.ui.timerColor;
  }

  watchIsWaitingTime() {
    return this.ui.isWaitingTime;
  }
}
