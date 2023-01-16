import DragonTigerClient from "dragon-tiger-client/umd";
import Observer from "observer";
import mobx from "mobx/dist/mobx.umd.production.min.js";

export const container = DragonTigerClient.createContainer({
  makeObservable: mobx.makeAutoObservable,
});

Observer.configure({
  default: { mobx, container },
  dragonTiger: { mobx, container },
});
