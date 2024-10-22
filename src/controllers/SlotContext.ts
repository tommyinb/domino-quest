import { createContext } from "react";
import { Item } from "./item";
import { ItemState } from "./itemState";

export const SlotContext = createContext<{
  item: Item;
}>({
  item: {
    level: 0,
    start: {
      name: "",
      cameraPosition: [0, 0, 0],
      stageElement: () => {
        throw new Error("Not implemented");
      },
    },
    state: ItemState.Idle,
    build: {
      blocks: [],
      undoHandlers: [],
      retryHandlers: [],
    },
    round: 0,
  },
});
