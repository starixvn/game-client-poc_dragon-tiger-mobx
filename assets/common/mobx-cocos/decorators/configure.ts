import { DIContainer, Mobx } from "../interfaces";

export const mobxCocosData = {
  mobx: null,
  diContainer: null,
};

export function configure(mobx: Mobx, container: DIContainer) {
  mobxCocosData.mobx = mobx;
  mobxCocosData.diContainer = container;
}
