import { container } from "../common/external";
import { GameData } from "./stores/game-data";

container.bind(GameData).to(GameData).inSingletonScope();

export const gameData = container.resolve(GameData);
