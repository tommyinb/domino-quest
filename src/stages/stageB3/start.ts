import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const stageElement = Stage;
export const stageHeight = 600;
export const cameraPosition: Vector3Tuple = [-75, 150, 250];

export const stationPositions: Vector3Tuple[] = [
  [-20, 0, 130],
  [-70, 0, 50],
  [-60, 0, -60],
  [30, 0, -130],
  [90, 0, -50],
  [40, 0, 40],
];

export const successMessage: Record<Language, string> = {
  en: "Circle Round",
  zh: "轉得很開心嘛",
  ja: "曲がったね！",
};
