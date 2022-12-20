import { inversify, mobx } from "../../../common/external";

const { observable, makeObservable } = mobx;
const { injectable } = inversify;

@injectable()
export class DragonTigerConfigsStore {
  constructor() {
    makeObservable(this);
  }

  @observable
  durationConfigs = {
    whole: 36,
    waiting: 5,
    locking: 5,
    betting: 30,
  };
}
