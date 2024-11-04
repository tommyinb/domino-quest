import { Vector3Tuple } from "three";

export interface ItemStart {
  name?: string;

  stageElement: () => JSX.Element;
  stageHeight: number;
  cameraPosition: Vector3Tuple;

  successMessage?: string;
  failMessage?: string;
}
