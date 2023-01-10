import { DragonTigerMatchStore } from "../stores/dragon-tiger-match-store";

export class RemainingTimeWatcher {
  constructor(protected readonly match: DragonTigerMatchStore) {}

  watch(): number {
    return this.match.remainingTime;
  }
}
