import { makeAutoObservable } from "mobx";

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
  constructor() {
    makeAutoObservable(this);
  }

  remainingTime: number;

  totalBets: DragonTigerChoice<number>;

  ownBets: DragonTigerChoice<number>;

  result: DragonTigerChoice<Card>;

  settlementResult: DragonTigerChoice<boolean>;

  reduceRemainingTime() {
    if (this.remainingTime > 0) {
      this.remainingTime = this.remainingTime - 1;
    }
  }

  setRemainingTime(time: number) {
    this.remainingTime = time;
  }
}
