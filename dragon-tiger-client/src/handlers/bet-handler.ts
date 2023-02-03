import { IHandler } from "../handler";
import { DragonTigerChoice } from "../stores";
import { ConnectToServerHandler as ConnectionManager } from "./connect-to-server-handler";

export class BetHandler implements IHandler<DragonTigerChoice<number>> {
  constructor(protected readonly manager: ConnectionManager) {}

  handle(bets: DragonTigerChoice<number>) {
    this.manager.connection.emit("bet", bets);
  }
}
