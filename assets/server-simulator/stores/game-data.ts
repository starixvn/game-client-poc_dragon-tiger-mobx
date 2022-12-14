import { inversify, mobx } from "../../common/external";
import { DragonTigerChoice } from "../../dragon-tiger-mobx/scripts/stores/dragon-tiger-match-store";
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

  ownBets: DragonTigerChoice<number> = {};

  totalBets: DragonTigerChoice<number> = {};

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
  }
}
