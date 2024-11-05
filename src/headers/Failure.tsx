import { useContext, useMemo } from "react";
import { BlockType } from "../blocks/blockType";
import { DominoType } from "../blocks/dominoType";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { useSetCurrentItem } from "../controllers/useSetCurrentItem";
import { SettingContext } from "../settings/SettingContext";
import "./Failure.css";

export function Failure() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const built = useMemo(
    () =>
      item?.build.blocks.some(
        (block) =>
          block.blockType === BlockType.Domino &&
          block.dominoType === DominoType.Last
      ),
    [item?.build.blocks]
  );

  const { formActive } = useContext(SettingContext);

  return (
    <div
      className={`headers-Failure ${
        item?.state === ItemState.Failure && !formActive ? "active" : ""
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
