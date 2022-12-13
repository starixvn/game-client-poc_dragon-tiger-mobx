import { inversify, mobx } from "../../../common/external";

const { observable, makeObservable, action } = mobx;
const { injectable } = inversify;

export interface DragonTigerChoice<T> {
  dragon?: T;
  tiger?: T;
  tie?: T;
}

export interface Card {
  card: number;
  type: number;
}

@injectable()
export class DragonTigerMatchStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  remainingTime: number;

  @observable
  totalBets: DragonTigerChoice<number>;

  @observable
  ownBets: DragonTigerChoice<number>;

  @observable
  result: DragonTigerChoice<Card>;

  @observable
  settlementResult: DragonTigerChoice<boolean>;

  @action
  reduceRemainingTime() {
    if (this.remainingTime > 0) {
      this.remainingTime = this.remainingTime - 1;
    }
  }

  @action
  setRemainingTime(time: number) {
    this.remainingTime = time;
  }
}
