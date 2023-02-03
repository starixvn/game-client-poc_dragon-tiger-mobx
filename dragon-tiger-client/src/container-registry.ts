import {
  BetHandler,
  ConnectToServerHandler,
  ReduceRemainingTimeHandler,
} from "./handlers";
import {
  DragonTigerConfigsStore,
  DragonTigerMatchStore,
  DragonTigerUIStore,
} from "./stores";

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
    ctor: ConnectToServerHandler,
    token: "ConnectToServerHandler",
    inject: [DragonTigerMatchStore],
  },
  {
    ctor: ReduceRemainingTimeHandler,
    token: "ReduceRemainingTimeHandler",
    inject: [DragonTigerMatchStore],
  },
  {
    ctor: BetHandler,
    token: "BetHandler",
    inject: [ConnectToServerHandler],
  },
];
