import { IHandler } from "../handler";
import { DragonTigerChoice } from "../stores";
import { ConnectToServer } from "./connect-to-server";

export class Bet implements IHandler<DragonTigerChoice<number>> {
  constructor(protected readonly server: ConnectToServer) {}

  handle(bets: DragonTigerChoice<number>) {
    this.server.connection.emit("bet", bets);
  }
}
