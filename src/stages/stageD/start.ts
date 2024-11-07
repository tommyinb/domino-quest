import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const uuid = "06865790-f5e9-472a-b1ab-2cf6280c576b";
export const name: Record<Language, string> = {
  en: "Your Masterpiece",
  zh: "最後的作品",
  ja: "最後の作品",
};

export const stageElement = Stage;
export const stageHeight = 1000;
export const cameraPosition: Vector3Tuple = [0, 500, 650];
