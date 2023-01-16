import { Component, director, _decorator } from "cc";
import DTClient from "dragon-tiger-client/umd";
import Observer from "observer";
import { ServerSimulator } from "../../server-simulator/components/server-simulator";
import "./dragon-tiger-startup";

const { ccclass } = _decorator;
const { observer, handle } = Observer;
const { ReduceRemainingTime, ConnectToServer } = DTClient;

@ccclass
@observer
export class DragonTiger extends Component {
  onLoad() {
    this.schedule(this.onCronUpdated, 1);
    this.connectToServer();
  }

  @handle(ReduceRemainingTime)
  onCronUpdated() {}

  @handle(ConnectToServer)
  connectToServer() {
    const simulator = director
      .getScene()
      .getComponentInChildren(ServerSimulator);

    return simulator.node;
  }
}
