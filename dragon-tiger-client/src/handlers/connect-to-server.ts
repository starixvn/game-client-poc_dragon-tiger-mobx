import { IHandler } from "../handler";
import { DragonTigerMatchStore } from "../stores";

export interface Connection {
  on(event: string, callback: (payload: any) => void): void;
}

export class ConnectToServer implements IHandler<Connection> {
  constructor(protected readonly match: DragonTigerMatchStore) {}

  handle(connection: Connection) {
    connection.on("message", (payload) => {
      if (payload.remainingTime) {
        this.match.remainingTime = payload.remainingTime;
      }

      if (!!payload.totalBets) {
        this.match.totalBets = payload.totalBets;
      }
    });
  }
}
