import { createContext, Dispatch, SetStateAction } from "react";
import { GestureMode } from "./gestureMode";
import { Item } from "./item";

export const ControllerContext = createContext<{
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;

  levels: number[];
  setLevels: Dispatch<SetStateAction<number[]>>;

  gestureMode: GestureMode;
  setGestureMode: (mode: GestureMode) => void;
}>({
  items: [],
  setItems: () => {},

  levels: [],
  setLevels: () => {},

  gestureMode: GestureMode.Build,
  setGestureMode: () => {},
});
