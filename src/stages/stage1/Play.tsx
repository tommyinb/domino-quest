import { useContext, useEffect, useMemo, useState } from "react";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { BlockType } from "../../dominos/blockType";
import { FirstDomino } from "../../dominos/FirstDomino";
import { FollowDomino } from "../../dominos/FollowDomino";
import { PlayContext } from "../PlayContext";

export function Play() {
  const { item } = useContext(SlotContext);
  const lastIndex = useMemo(
    () => item.blocks.findIndex((block) => block.type === BlockType.Last),
    [item.blocks]
  );

  const [tippeds, setTippeds] = useState<boolean[]>([]);
  useEffect(() => {
    setTippeds((tippings) => {
      if (tippings.length < item.blocks.length) {
        return tippings.concat(
          new Array(item.blocks.length - tippings.length).fill(false)
        );
      } else if (tippings.length > item.blocks.length) {
        return tippings.slice(0, item.blocks.length);
      } else {
        return tippings;
      }
    });
  }, [item.blocks.length]);

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
      {item.blocks.map((block, index) =>
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
