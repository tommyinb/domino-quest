import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const stageElement = Stage;
export const stageHeight = 600;
export const cameraPosition: Vector3Tuple = [-75, 175, 200];

export const startPosition: Vector3Tuple = [0, 0, 75];
export const middlePosition: Vector3Tuple = [-30, 0, -40];
export const endPosition: Vector3Tuple = [100, 0, -100];

export const successMessage: Record<Language, string> = {
  en: "Steering",
  zh: "轉彎",
  ja: "曲がろ",
};
