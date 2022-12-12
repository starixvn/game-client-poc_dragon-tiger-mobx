import { Color, Component, Node, Sprite, _decorator } from "cc";

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass
export class CardModel {
  rank: string;
  suit: number;
}

@ccclass
@executeInEditMode
export default class Card extends Component {
  private _value = 0;

  @property(Sprite)
  protected rank: Sprite = null;

  @property(Sprite)
  protected smallSuit: Sprite = null;

  @property(Sprite)
  protected largeSuit: Sprite = null;

  @property(Node)
  protected back: Node = null;

  @property
  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;

    this.render();
  }

  protected readonly rankMapper = [
    "a",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "j",
    "q",
    "k",
  ];

  setCard(model: CardModel) {
    const rank = this.rankMapper.indexOf(model.rank);

    this.value = rank * model.suit;
  }

  render() {
    this.renderSuit();
    this.renderRank();
    this.renderBack();
  }

  renderRank() {
    const isBlack = Math.floor(this._value / 13) > 1;
    const rank = this._value % 13;
    const rankColor = isBlack
      ? Color.BLACK.clone().fromHEX("#000000")
      : Color.WHITE.clone().fromHEX("#960000");

    this.rank.changeSpriteFrameFromAtlas(this.rankMapper[rank]);

    this.rank.color.set(rankColor);
  }

  renderSuit() {
    this.smallSuit.changeSpriteFrameFromAtlas(this.getSuitName(true));
    this.largeSuit.changeSpriteFrameFromAtlas(this.getSuitName());
  }

  renderBack() {
    this.back.active = this.value < 0 || this.value > 51;
  }

  getSuitName(isSmall: boolean = false) {
    const suit = (this._value / 13) >> 0;
    const rank = this._value % 13;
    const suits = ["heart", "diamond", "club", "spade"];

    if (isSmall) {
      return `${suits[suit]}_small`;
    } else {
      const rankString = this.rankMapper[rank];
      const picture = {
        j: "j_picture",
        q: "q_picture",
        k: "k_picture",
      };

      if (picture[rankString]) {
        return picture[rankString];
      } else {
        return suits[suit];
      }
    }
  }
}
