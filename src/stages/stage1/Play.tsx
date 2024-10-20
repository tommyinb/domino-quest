import { useContext, useEffect, useMemo, useState } from "react";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { FirstDomino } from "../../dominos/FirstDomino";
import { FollowDomino } from "../../dominos/FollowDomino";
import { BlockType } from "../blockType";
import { PlayContext } from "../PlayContext";
import { StageContext } from "../StageContext";

export function Play() {
  const { blocks } = useContext(StageContext);
  const lastIndex = useMemo(
    () => blocks.findIndex((block) => block.type === BlockType.Last),
    [blocks]
  );

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
        if (tippeds[lastIndex]) {
          setSlotState(ItemState.Success);
        } else {
          const timer = setTimeout(() => setSlotState(ItemState.Failure), 2000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [item.state, lastIndex, setSlotState, tippeds]);

  return (
    <PlayContext.Provider
      value={useMemo(() => ({ tippeds, setTippeds }), [tippeds])}
    >
      {blocks.map((block, index) =>
        block.type === BlockType.First ? (
          <FirstDomino
            key={index}
            position={block.position}
            rotation={block.rotation}
            index={index}
          />
        ) : (
          <FollowDomino
            key={index}
            position={block.position}
            rotation={block.rotation}
            index={index}
          />
        )
      )}
    </PlayContext.Provider>
  );
}
