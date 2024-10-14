import { createContext } from "react";
import { Vector3 } from "three";
import { StageState } from "./stageState";

export const StageContext = createContext<{
  state: StageState;
  setState: (state: StageState) => void;

  dominos: Vector3[];
  setDominos: (dominos: Vector3[]) => void;
}>({
  state: StageState.Building,
  setState: () => {},

  dominos: [],
  setDominos: () => {},
});
