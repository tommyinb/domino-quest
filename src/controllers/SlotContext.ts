import { createContext } from "react";
import { Item } from "./item";
import { ItemState } from "./itemState";

export const SlotContext = createContext<{
  item: Item;
}>({
  item: {
    level: 0,
    state: ItemState.Idle,
  },
});
