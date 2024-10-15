import { createContext } from "react";
import { Item } from "./item";

export const ControllerContext = createContext<{
  items: Item[];
  setItems: (items: Item[]) => void;

  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}>({
  items: [],
  setItems: () => {},

  currentIndex: 0,
  setCurrentIndex: () => {},
});
