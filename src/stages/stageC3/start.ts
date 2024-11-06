import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const name: Record<Language, string> = {
  en: "Star",
  zh: "星願",
  ja: "星の華",
};

export const stageElement = Stage;
export const stageHeight = 1000;
export const cameraPosition: Vector3Tuple = [0, 500, 600];
