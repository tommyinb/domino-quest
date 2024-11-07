import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const uuid = "5a828621-2e6e-469a-be31-51aacfdb54fe";
export const name: Record<Language, string> = {
  en: "Bridges",
  zh: "九道橋",
  ja: "九本の橋",
};

export const stageElement = Stage;
export const stageHeight = 1000;
export const cameraPosition: Vector3Tuple = [0, 500, 600];
