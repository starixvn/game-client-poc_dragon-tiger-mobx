import "reflect-metadata";
import { Container } from "inversify";
import { helpers } from "inversify-vanillajs-helpers";
import { ReduceRemainingTime } from "./handlers";
import {
  DragonTigerConfigsStore,
  DragonTigerMatchStore,
  DragonTigerUIStore,
} from "./stores";
import { MatchWatcher, RemainingTimeWatcher, UIWatcher } from "./watchers";

helpers.annotate(ReduceRemainingTime, [DragonTigerMatchStore]);

helpers.annotate(DragonTigerConfigsStore);
helpers.annotate(DragonTigerMatchStore);
helpers.annotate(DragonTigerUIStore, [
  DragonTigerMatchStore,
  DragonTigerConfigsStore,
]);

helpers.annotate(MatchWatcher, [DragonTigerMatchStore]);
helpers.annotate(RemainingTimeWatcher, [DragonTigerMatchStore]);
helpers.annotate(UIWatcher, [DragonTigerUIStore]);

export const container = new Container({
  defaultScope: "Singleton",
  autoBindInjectable: true,
});
