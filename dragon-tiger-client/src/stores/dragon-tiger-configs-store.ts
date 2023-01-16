export class DragonTigerConfigsStore {
  constructor(makeObservable: (...params: any[]) => any) {
    makeObservable(this);
  }

  durationConfigs = {
    whole: 36,
    waiting: 5,
    locking: 5,
    betting: 30,
  };
}
