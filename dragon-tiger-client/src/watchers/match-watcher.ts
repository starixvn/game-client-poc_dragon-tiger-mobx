import { DragonTigerChoice, DragonTigerMatchStore } from "../stores";

export class MatchWatcher {
  constructor(protected readonly match: DragonTigerMatchStore) {}

  watchTotalBets(): DragonTigerChoice<number> {
    return this.match.totalBets;
  }
}
