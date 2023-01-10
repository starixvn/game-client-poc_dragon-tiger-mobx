import { DragonTigerUIStore } from "../stores/dragon-tiger-ui-store";

export class UIWatcher {
  constructor(protected readonly uiStore: DragonTigerUIStore) {}

  watchTimerColor() {
    return this.uiStore.timerColor;
  }

  watchIsWaitingTime() {
    return this.uiStore.isWaitingTime;
  }
}
