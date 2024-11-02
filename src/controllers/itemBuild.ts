import { Block } from "../blocks/block";
import { ItemBuildNext } from "./itemBuildNext";

export interface ItemBuild {
  blocks: Block[];

  availableNexts: ItemBuildNext[];
  selectedNext: ItemBuildNext | undefined;

  undoHandlers: (() => void)[];
  retryHandlers: (() => void)[];
}
