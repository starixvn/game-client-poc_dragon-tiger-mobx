import "../../dragon-tiger/scripts/dragon-tiger-container";
import { container } from "../../common/external";
import { DragonTigerMatchStore } from "../../dragon-tiger/scripts/stores/dragon-tiger-match-store";
import { DragonTigerUIStore } from "../../dragon-tiger/scripts/stores/dragon-tiger-ui-store";

export const uiStore = container.resolve(DragonTigerUIStore);
export const matchStore = container.resolve(DragonTigerMatchStore);
