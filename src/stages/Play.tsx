import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SlotContext } from "../controllers/SlotContext";
import { BlockType } from "../dominos/blockType";
import { FirstDomino } from "../dominos/FirstDomino";
import { FollowDomino } from "../dominos/FollowDomino";
import { PlayContext } from "./PlayContext";

export function Play({ children }: PropsWithChildren) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

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

      {children}
    </PlayContext.Provider>
  );
}
