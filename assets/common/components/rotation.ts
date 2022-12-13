import { Component, tween, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Rotation extends Component {
  @property
  protected degreePerSecond = 360;

  onEnable() {
    tween(this.node)
      .by(1, { angle: -this.degreePerSecond })
      .repeatForever()
      .start();
  }
}
