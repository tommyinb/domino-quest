import { Vector3Tuple } from "three";

export interface ItemStart {
  description: string;

  cameraPosition: Vector3Tuple;

  stageElement: () => JSX.Element;
}
