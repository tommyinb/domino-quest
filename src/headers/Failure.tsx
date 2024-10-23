import { useMemo } from "react";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { useSetCurrentItem } from "../controllers/useSetCurrentItem";
import { BlockType } from "../dominos/blockType";
import "./Failure.css";

export function Failure() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const built = useMemo(
    () => item?.build.blocks.some((block) => block.type === BlockType.Last),
    [item?.build.blocks]
  );

  return (
    <div
      className={`headers-Failure ${
        item?.state === ItemState.Failure ? "active" : ""
      }`}
    >
      <div className="content">
        <div className="level">Level {item?.level}</div>

        <div className="message">
          {item?.start.failMessage ?? item?.start.name}
        </div>

        <div
          className="button"
          onClick={() =>
            setItem((item) => ({
              ...item,
              state: ItemState.Building,
              round: item.round + 1,
            }))
          }
        >
          {built ? "Try again" : "Keep building"}
        </div>
      </div>
    </div>
  );
}
