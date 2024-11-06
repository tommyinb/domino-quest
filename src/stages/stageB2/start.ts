import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const stageElement = Stage;
export const stageHeight = 600;
export const cameraPosition: Vector3Tuple = [-75, 175, 200];

export const stationPositions: Vector3Tuple[] = [
  [-20, 0, 100],
  [-30, 0, 0],
  [70, 0, -40],
  [-10, 0, -150],
];

export const successMessage: Record<Language, string> = {
  en: "Steering Practice",
  zh: "左轉右轉",
  ja: "曲がり練習",
};
