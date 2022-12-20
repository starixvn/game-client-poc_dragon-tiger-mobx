import { inversify } from "../../../common/external";
import { IHandler } from "../../../common/mobx-cocos";
import { DragonTigerMatchStore } from "../stores/dragon-tiger-match-store";

const { injectable, inject } = inversify;

@injectable()
export class ReduceRemainingTime implements IHandler<void> {
  @inject(DragonTigerMatchStore)
  match: DragonTigerMatchStore;

  async handle(): Promise<void> {
    this.match.reduceRemainingTime();
  }
}
