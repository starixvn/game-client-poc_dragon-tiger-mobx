import { Sprite, _decorator, Node, tween, v3, Vec3, Tween } from "cc";
import HistoryChainItem from "../../../common/components/history-chain-item";
import { DragonTigerChoice } from "../stores/dragon-tiger-match-store";

const { ccclass, property } = _decorator;

@ccclass
export default class DragonTigerHistoryChainItem extends HistoryChainItem<
  DragonTigerChoice<boolean>
> {
  @property(Sprite)
  protected sprite: Sprite = null;

  @property(Node)
  protected highlight: Node = null;

  protected animation: Tween<Node> = null;

  setValue(value: DragonTigerChoice<boolean>) {
    const name = this.getSpriteName(value);

    this.sprite!.changeSpriteFrameFromAtlas(name);
  }

  onUpdated(index: number, size: number) {
    const shouldHighlight = index === size - 1;

    this.highlight!.active = shouldHighlight;

    if (!this.animation) {
      this.animation = this.createTween();
    }

    if (shouldHighlight) {
      this.animation.start();
    } else {
      this.animation.stop();
    }
  }

  protected getSpriteName(value: DragonTigerChoice<boolean>) {
    if (value.dragon) {
      return "dot_rong";
    } else if (value.tiger) {
      return "dot_ho";
    } else {
      return "dot_hoa";
    }
  }

  protected createTween() {
    const duration = 0.3;
    const distance = 2;

    return tween(this.node)
      .sequence(
        tween().by(duration, { position: v3(0, distance, 0) }),
        tween().by(duration, { position: v3(0, -distance, 0) })
      )
      .repeatForever();
  }
}
