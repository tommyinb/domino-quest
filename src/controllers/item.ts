import { Block } from "../dominos/block";
import { ItemStart } from "./itemStart";
import { ItemState } from "./itemState";

export interface Item {
  level: number;

  start: ItemStart;

  state: ItemState;

  blocks: Block[];
}
