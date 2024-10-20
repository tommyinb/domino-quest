import { useContext, useEffect, useMemo, useState } from "react";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { useSetSlotState } from "../controllers/useSetSlotState";
import { StageContext } from "../stages/stage1/StageContext";
import { BlockType } from "./blockType";
import { FirstDomino } from "./FirstDomino";
import { LastDomino } from "./LastDomino";
import { MiddleDomino } from "./MiddleDomino";
import { PlayContext } from "./PlayContext";

export function Play() {
  const { blocks } = useContext(StageContext);

  const [tippeds, setTippeds] = useState<boolean[]>([]);
  useEffect(() => {
    setTippeds((tippings) => {
      if (tippings.length < blocks.length) {
        return tippings.concat(
          new Array(blocks.length - tippings.length).fill(false)
        );
      } else if (tippings.length > blocks.length) {
        return tippings.slice(0, blocks.length);
      } else {
        return tippings;
      }
    });
  }, [blocks.length]);

  const { item } = useContext(SlotContext);
  const setSlotState = useSetSlotState();
  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (tippeds) {
        const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [item.state, setSlotState, tippeds]);

  return (
    <PlayContext.Provider
      value={useMemo(() => ({ tippeds, setTippeds }), [tippeds])}
    >
      {blocks.map((block, index) =>
        block.type === BlockType.First ? (
          <FirstDomino key={index} position={block.position} index={index} />
        ) : block.type === BlockType.Last ? (
          <LastDomino key={index} position={block.position} index={index} />
        ) : (
          <MiddleDomino key={index} position={block.position} index={index} />
        )
      )}
    </PlayContext.Provider>
  );
}
