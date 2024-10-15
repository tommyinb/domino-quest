import { StageState } from "../stages/stageState";

export interface Item {
  majorLevel: number;
  minorLevel: number;

  state: StageState;
}
