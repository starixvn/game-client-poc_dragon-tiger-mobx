import { container } from "../../common/external";
import { DragonTigerConfigsStore } from "./stores/dragon-tiger-configs-store";
import { DragonTigerMatchStore } from "./stores/dragon-tiger-match-store";
import { DragonTigerUIStore } from "./stores/dragon-tiger-ui-store";

container
  .bind(DragonTigerConfigsStore)
  .to(DragonTigerConfigsStore)
  .inSingletonScope();

container
  .bind(DragonTigerMatchStore)
  .to(DragonTigerMatchStore)
  .inSingletonScope();

container.bind(DragonTigerUIStore).to(DragonTigerUIStore).inSingletonScope();
