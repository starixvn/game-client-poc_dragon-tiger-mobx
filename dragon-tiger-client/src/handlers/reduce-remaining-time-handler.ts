import { IHandler } from "../handler";
import { DragonTigerMatchStore } from "../stores";

export class ReduceRemainingTimeHandler implements IHandler<void> {
  constructor(protected readonly match: DragonTigerMatchStore) {}

  handle() {
    this.match.reduceRemainingTime();
  }
}
