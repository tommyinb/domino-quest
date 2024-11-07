import { Vector3Tuple } from "three";
import { Language } from "../languages/language";

export interface ItemStart {
  uuid: string;
  name?: Record<Language, string>;

  stageElement: () => JSX.Element;
  stageHeight: number;
  cameraPosition: Vector3Tuple;

  successMessage?: Record<Language, string>;
  failureMessage?: Record<Language, string>;
}
