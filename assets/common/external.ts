import "reflect-metadata";
import mobx from "mobx/dist/mobx.umd.production.min.js";
import inversify from "inversify";

const container = new inversify.Container({ autoBindInjectable: true });

export { mobx, inversify, container };
