import { createContext, Dispatch, SetStateAction } from "react";
import { GestureMode } from "./gestureMode";
import { Item } from "./item";

export const ControllerContext = createContext<{
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;

  currentLevel: number;
  setCurrentLevel: (level: number) => void;

  gestureMode: GestureMode;
  setGestureMode: (mode: GestureMode) => void;
}>({
  items: [],
  setItems: () => {},

  currentLevel: 0,
  setCurrentLevel: () => {},

  gestureMode: GestureMode.Build,
  setGestureMode: () => {},
});
