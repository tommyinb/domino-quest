import { Vector3Tuple } from "three";
import { Language } from "../../languages/language";
import { Stage } from "./Stage";

export const name: Record<Language, string> = {
  en: "Follow the Line",
  zh: "沿線",
  ja: "線に従って",
};

export const stageElement = Stage;
export const stageHeight = 600;
export const cameraPosition: Vector3Tuple = [0, 170, 270];

export const startPosition: Vector3Tuple = [0, 0, 20];
export const endPosition: Vector3Tuple = [0, 0, 170];

export const successMessage: Record<Language, string> = {
  en: "Spiral",
  zh: "繞圈圈",
  ja: "くるくるくる",
};
export const failureMessage: Record<Language, string> = {
  en: "Mary Go Round",
  zh: "繞圈圈",
  ja: "くるくるくる",
};
