import { makeAutoObservable } from "mobx";

export class DragonTigerConfigsStore {
  constructor() {
    makeAutoObservable(this);
  }

  durationConfigs = {
    whole: 36,
    waiting: 5,
    locking: 5,
    betting: 30,
  };
}
