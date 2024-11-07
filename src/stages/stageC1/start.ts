import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const uuid = "05c247ba-54f9-437f-a77d-24eb783363e6";

export const stageElement = Stage;
export const stageHeight = 1000;
export const cameraPosition: Vector3Tuple = [0, 150, 200];

export const successMessage: Record<Language, string> = {
  en: "Bridge",
  zh: "橋接",
  ja: "橋",
};
