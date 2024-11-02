import { useContext, useEffect } from "react";
import { DominoType } from "../../blocks/dominoType";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { PlayContext } from "../PlayContext";

export function Judge() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const { tippeds } = useContext(PlayContext);

  const setSlotState = useSetSlotState();

  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (
        blocks.some(
          (block, index) =>
            block.dominoType === DominoType.Last && tippeds[index]
        )
      ) {
        setSlotState(ItemState.Success);
      } else {
        const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [blocks, item.state, setSlotState, tippeds]);

  return <></>;
}
