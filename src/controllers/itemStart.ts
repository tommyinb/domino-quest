import { Vector3Tuple } from "three";

export interface ItemStart {
  name?: string;

  cameraPosition: Vector3Tuple;
  stageElement: () => JSX.Element;

  successMessage?: string;
  failMessage?: string;
}
