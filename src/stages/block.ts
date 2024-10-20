import { Euler, Vector3 } from "three";
import { BlockType } from "./blockType";

export interface Block {
  type: BlockType;

  position: Vector3;
  rotation: Euler;
}
