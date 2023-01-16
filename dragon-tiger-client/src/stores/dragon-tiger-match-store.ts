export interface DragonTigerChoice<T> {
  dragon?: T;
  tiger?: T;
  tie?: T;
}

export interface Card {
  card: number;
  type: number;
}

export class DragonTigerMatchStore {
  constructor(makeObservable: (...params: any[]) => any) {
    makeObservable(this);
  }

  protected _remainingTime: number = 0;

  get remainingTime() {
    return this._remainingTime;
  }

  set remainingTime(value: number) {
    this._remainingTime = value;
  }

  totalBets: DragonTigerChoice<number> = {};

  ownBets: DragonTigerChoice<number> = {};

  result: DragonTigerChoice<Card> = {};

  settlementResult: DragonTigerChoice<boolean> = {};

  reduceRemainingTime() {
    if (this.remainingTime > 0) {
      this.remainingTime = this.remainingTime - 1;
    }
  }
}
