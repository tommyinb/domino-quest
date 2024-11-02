import { useContext, useEffect } from "react";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { PlayContext } from "../PlayContext";

export function useJudge(length: number, progress: number) {
  const { item } = useContext(SlotContext);

  const { tippeds } = useContext(PlayContext);

  const setSlotState = useSetSlotState();

  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (progress >= length) {
        setSlotState(ItemState.Success);
      } else {
        if (tippeds) {
          const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [item.state, length, progress, setSlotState, tippeds]);
}
