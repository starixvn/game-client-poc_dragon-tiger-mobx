import "reflect-metadata";
import mobx from "mobx/dist/mobx.umd.production.min.js";
import inversify from "inversify";
import { configure } from "./mobx-cocos";

const container = new inversify.Container({ autoBindInjectable: true });

configure(mobx, container);

export { mobx, inversify, container };
