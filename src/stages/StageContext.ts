import { createContext } from "react";
import { Block } from "./block";
import { StageState } from "./stageState";

export const StageContext = createContext<{
  state: StageState;
  setState: (state: StageState) => void;

  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}>({
  state: StageState.Playing,
  setState: () => {},

  blocks: [],
  setBlocks: () => {},
});
