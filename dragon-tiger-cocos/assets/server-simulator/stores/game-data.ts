import { inversify, mobx } from "../../common/external";
import { rounds } from "../data/rounds";

const { observable, makeObservable, action, computed } = mobx;
const { injectable } = inversify;

@injectable()
export class GameData {
  constructor() {
    makeObservable(this);
  }

  @observable
  remainingTime: number;

  @observable
  roundId: number;

  gameConfigs = {
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { dragon: 3000, tiger: 3000, tie: 1000 },
    chips: ["1", "3", "5", "10", "50", "100", "200", "500", "1000", "2000"],
    stakeLevels: [],
    odds: { dragon: 2, tiger: 2, tie: 11 },
    enableFreeBet: false,
    wholeRound: 36,
  };

  roundHistory = [];

  ownBets: Record<string, number> = {};

  totalBets: Record<string, number> = {};

  roundIndex = 0;

  @action
  countdown() {
    this.remainingTime = this.remainingTime - 1;
  }

  @action
  initialize(remainingTime: number, roundIndex: number) {
    this.remainingTime = remainingTime;

    this.roundHistory = [...rounds].slice(0, roundIndex);

    const currentRound = rounds[roundIndex];
    this.roundId = currentRound.roundId;
    this.roundIndex = roundIndex;
  }

  @computed
  get shouldSettle() {
    return this.remainingTime === 0;
  }

  @action
  settle() {
    this.initialize(this.gameConfigs.wholeRound, this.roundIndex + 1);
    this.resetData();
  }

  fakeData() {
    const shouldUpdateTotalBets = (Math.random() * 100) >> 0 < 30;

    if (shouldUpdateTotalBets) {
      this.totalBets.dragon = (Math.random() * 10000) >> 0;
      this.totalBets.tie = (Math.random() * 10000) >> 0;
      this.totalBets.tiger = (Math.random() * 10000) >> 0;
    }
  }

  resetData() {
    this.totalBets = {};
    this.ownBets = {};
  }
}
