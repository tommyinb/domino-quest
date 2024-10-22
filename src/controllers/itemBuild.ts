import { Block } from "../dominos/block";

export interface ItemBuild {
  blocks: Block[];

  undoHandlers: (() => void)[];
  retryHandlers: (() => void)[];
}
