import { BlockType } from "../blocks/blockType";

export interface ItemBuildNext {
  blockType: BlockType;

  limit: number | undefined;

  enabled: boolean;
}
