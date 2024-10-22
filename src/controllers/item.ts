import { ItemBuild } from "./itemBuild";
import { ItemStart } from "./itemStart";
import { ItemState } from "./itemState";

export interface Item {
  level: number;

  start: ItemStart;

  state: ItemState;

  build: ItemBuild;

  round: number;
}
