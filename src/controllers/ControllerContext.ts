import { createContext, Dispatch, SetStateAction } from "react";
import { Item } from "./item";

export const ControllerContext = createContext<{
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;

  currentLevel: number;
  setCurrentLevel: (level: number) => void;
}>({
  items: [],
  setItems: () => {},

  currentLevel: 0,
  setCurrentLevel: () => {},
});
