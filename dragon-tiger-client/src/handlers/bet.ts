import { IHandler } from "../handler";
import { DragonTigerChoice } from "../stores";
import { ConnectToServer as ConnectionManager } from "./connect-to-server";

export class Bet implements IHandler<DragonTigerChoice<number>> {
  constructor(protected readonly manager: ConnectionManager) {}

  handle(bets: DragonTigerChoice<number>) {
    this.manager.connection.emit("bet", bets);
  }
}
