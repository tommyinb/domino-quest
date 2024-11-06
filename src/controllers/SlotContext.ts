import { createContext } from "react";
import { Item } from "./item";
import { ItemState } from "./itemState";

export const SlotContext = createContext<{
  item: Item;
}>({
  item: {
    level: 0,
    start: {
      stageElement: () => {
        throw new Error("Not implemented");
      },
      stageHeight: 600,
      cameraPosition: [0, 0, 0],
    },
    state: ItemState.Idle,
    build: {
      blocks: [],
      availableNexts: [],
      selectedNext: undefined,
      undoHandlers: [],
      retryHandlers: [],
      view: 0,
    },
    round: 0,
  },
});
