import {
  Color,
  Component,
  Label,
  _decorator,
  Node,
  tween,
  v2,
  UITransform,
  v3,
} from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class AnimatedTime extends Component {
  @property(Label)
  firstChar: Label = null;

  @property(Label)
  secondChar: Label = null;

  @property
  animated = true;

  @property
  effectLastTime = false;

  protected timeToChangeColor = 5;
  protected changedColor: Color = Color.RED;
  protected normalColor: Color = Color.WHITE;
  public animatedYTop = 70;
  public animatedYBottom = -10;
  public animatedYFinalBottom = 0;

  setRedTime(time: number) {
    this.timeToChangeColor = time;
  }

  setChangedColor(color: Color) {
    this.changedColor = color;
  }

  setAnimatedY(yTop: number, yBottom: number) {
    this.animatedYTop = yTop;
    this.animatedYBottom = yBottom;
  }

  resetTime() {}

  public setTime(time: string, forceChangeColor = false) {
    this.node.active = true;
    const firstTimeChar = time.toString().slice(0, 1);
    const secondTimeChar = time.toString().slice(1, 2);

    if (this.firstChar.string !== firstTimeChar) {
      this.handleBetTimeAnimation(this.firstChar.node);
    }

    if (this.secondChar.string !== secondTimeChar) {
      this.handleBetTimeAnimation(this.secondChar.node);
    }

    this.firstChar.string = firstTimeChar;
    this.secondChar.string = secondTimeChar;

    if (this.effectLastTime && parseInt(time) <= this.timeToChangeColor) {
      this.playEffectLastTime();
    }

    this.setColor(time, forceChangeColor);
  }

  public handleBetTimeAnimation(node: Node) {
    if (this.animated) {
      tween(node)
        .to(0, {
          position: v3(node.position.x, this.animatedYTop, node.position.z),
        })
        .to(0.2, {
          position: v3(node.position.x, 0, node.position.z),
        })
        .to(0.1, {
          position: v3(node.position.x, this.animatedYBottom, node.position.z),
        })
        .to(0.1, {
          position: v3(
            node.position.x,
            this.animatedYFinalBottom,
            node.position.z
          ),
        })
        .start();
    }
  }

  protected setColor(time: string, forceChangeColor = false) {
    const colorChange =
      forceChangeColor ||
      (this.timeToChangeColor !== undefined &&
        parseInt(time) <= this.timeToChangeColor);
    this.firstChar.color = colorChange ? this.changedColor : this.normalColor;
    this.secondChar.color = this.firstChar.color;
  }

  setNumberColor(normalColor: string, changedColor: string) {
    this.normalColor = Color.WHITE.fromHEX(normalColor);
    this.changedColor = Color.WHITE.fromHEX(changedColor);
  }
}
