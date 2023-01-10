import { Color, Component, Label, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class Timer extends Component {
  @property(Label)
  time: Label = null;

  @property(Color)
  get color() {
    return this.time?.color;
  }

  set color(color: Color) {
    this.time.color.set(color);
  }

  @property
  get text() {
    return this.time?.string;
  }

  set text(value: string) {
    this.time.string = value;
  }
}
