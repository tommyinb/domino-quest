import { Euler, Vector3 } from "three";
import { BlockType } from "./blockType";

export interface BridgeBlock {
  blockType: BlockType.Bridge;

  position: Vector3;
  rotation: Euler;

  length: number;
}
