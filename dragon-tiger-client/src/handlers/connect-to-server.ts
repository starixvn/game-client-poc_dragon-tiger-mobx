import { IHandler } from "../handler";
import { DragonTigerMatchStore } from "../stores";

export interface Connection {
  on(event: string, callback: (payload: any) => void): void;

  emit(event: string, payload: any): void;
}

export class ConnectToServer implements IHandler<Connection> {
  connection: Connection;

  constructor(protected readonly match: DragonTigerMatchStore) {}

  handle(connection: Connection) {
    this.connection = connection;

    connection.on("message", (payload) => {
      if (payload.remainingTime) {
        this.match.remainingTime = payload.remainingTime;
      }

      if (!!payload.totalBets) {
        this.match.totalBets = payload.totalBets;
      }

      if (!!payload.ownBets) {
        this.match.ownBets = payload.ownBets;
      }
    });
  }
}
