import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const stageElement = Stage;
export const stageHeight = 600;
export const cameraPosition: Vector3Tuple = [-75, 125, 200];

export const startPosition: Vector3Tuple = [0, 0, 75];
export const endPosition: Vector3Tuple = [0, 0, -75];

export const successMessage: Record<Language, string> = {
  en: "A Good Start",
  zh: "多米諾之旅",
  ja: "A Good Start",
};
