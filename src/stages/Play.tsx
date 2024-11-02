import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Play as BlockPlay } from "../blocks/Play";
import { SlotContext } from "../controllers/SlotContext";
import { PlayContext } from "./PlayContext";

export function Play({ children }: PropsWithChildren) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const [tippeds, setTippeds] = useState<boolean[]>([]);
  useEffect(() => {
    setTippeds((tippeds) => {
      if (tippeds.length < blocks.length) {
        return tippeds.concat(
          new Array(blocks.length - tippeds.length).fill(false)
        );
      } else if (tippeds.length > blocks.length) {
        return tippeds.slice(0, blocks.length);
      } else {
        return tippeds;
      }
    });
  }, [blocks.length]);

  return (
    <PlayContext.Provider
      value={useMemo(() => ({ tippeds, setTippeds }), [tippeds])}
    >
      {blocks.map((block, index) => (
        <BlockPlay key={index} block={block} index={index} />
      ))}

      {children}
    </PlayContext.Provider>
  );
}
