import { Euler, Vector3 } from "three";
import { BlockType } from "./blockType";
import { DominoType } from "./dominoType";

export interface Domino {
  blockType: BlockType.Domino;

  dominoType: DominoType;

  position: Vector3;
  rotation: Euler;
}
