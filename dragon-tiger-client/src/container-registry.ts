import { ConnectToServer, ReduceRemainingTime } from "./handlers";
import {
  DragonTigerConfigsStore,
  DragonTigerMatchStore,
  DragonTigerUIStore,
} from "./stores";
import { MatchWatcher, RemainingTimeWatcher } from "./watchers";

export const Dependencies = [
  {
    ctor: DragonTigerConfigsStore,
    token: "DragonTigerConfigsStore",
    inject: ["makeObservable"],
  },
  {
    ctor: DragonTigerMatchStore,
    token: "DragonTigerMatchStore",
    inject: ["makeObservable"],
  },
  {
    ctor: DragonTigerUIStore,
    token: "DragonTigerUIStore",
    inject: ["makeObservable", DragonTigerMatchStore, DragonTigerConfigsStore],
  },
  {
    ctor: MatchWatcher,
    token: "MatchWatcher",
    inject: [DragonTigerMatchStore],
  },
  {
    ctor: RemainingTimeWatcher,
    token: "RemainingTimeWatcher",
    inject: [DragonTigerMatchStore],
  },
  {
    ctor: ConnectToServer,
    token: "ConnectToServer",
    inject: [DragonTigerMatchStore],
  },
  {
    ctor: ReduceRemainingTime,
    token: "ReduceRemainingTime",
    inject: [DragonTigerMatchStore],
  },
];
