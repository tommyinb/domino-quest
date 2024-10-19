import { createContext } from "react";
import { Item } from "./item";

export const ControllerContext = createContext<{
  items: Item[];
  setItems: (items: Item[]) => void;

  currentLevel: number;
  setCurrentLevel: (level: number) => void;
}>({
  items: [],
  setItems: () => {},

  currentLevel: 0,
  setCurrentLevel: () => {},
});
