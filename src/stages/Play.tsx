import { useContext, useEffect, useMemo, useState } from "react";
import { FirstDomino } from "../dominos/FirstDomino";
import { LastDomino } from "../dominos/LastDomino";
import { MiddleDomino } from "../dominos/MiddleDomino";
import { BlockType } from "./blockType";
import { PlayContext } from "./PlayContext";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Play() {
  const { state, setState, blocks } = useContext(StageContext);

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

  useEffect(() => {
    if (state === StageState.Playing) {
      if (tippeds) {
        const timer = setTimeout(() => setState(StageState.Failure), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [setState, state, tippeds]);

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
