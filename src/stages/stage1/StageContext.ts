import { createContext } from "react";
import { Block } from "../../dominos/block";

export const StageContext = createContext<{
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}>({
  blocks: [],
  setBlocks: () => {},
});
