import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const name: Record<Language, string> = {
  en: "Bear Love",
  zh: "畫熊",
  ja: "ぼくはくま",
};

export const stageElement = Stage;
export const stageHeight = 1000;
export const cameraPosition: Vector3Tuple = [0, 450, 150];
