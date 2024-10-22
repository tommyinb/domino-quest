import { useContext, useEffect } from "react";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { PlayContext } from "../PlayContext";

export function Judge() {
  const { item } = useContext(SlotContext);

  const { tippeds } = useContext(PlayContext);

  const setSlotState = useSetSlotState();

  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (tippeds) {
        if (tippeds[item.build.blocks.length - 1]) {
          setSlotState(ItemState.Success);
        } else {
          const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [item.build.blocks.length, item.state, setSlotState, tippeds]);

  return <></>;
}
