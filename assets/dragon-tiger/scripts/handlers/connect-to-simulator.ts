import { director } from "cc";
import { inversify } from "../../../common/external";
import { IHandler } from "../../../common/mobx-cocos";
import { DragonTigerMatchStore } from "../stores/dragon-tiger-match-store";
import { ServerSimulator } from "../../../server-simulator/components/server-simulator";

const { injectable, inject } = inversify;

@injectable()
export class ConnectToSimulator implements IHandler<void> {
  @inject(DragonTigerMatchStore)
  match: DragonTigerMatchStore;

  async handle(): Promise<void> {
    const simulator = director
      .getScene()
      .getComponentInChildren(ServerSimulator);

    simulator.node.on("message", (data) => {
      if (data.remainingTime) {
        this.match.setRemainingTime(data.remainingTime);
      }

      if (data.totalBets) {
        this.match.totalBets = data.totalBets;
      }
    });
  }
}
