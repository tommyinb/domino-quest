import { BlockType } from "../../blocks/blockType";
import { useCurrentItem } from "../../controllers/useCurrentItem";
import { useSetCurrentItem } from "../../controllers/useSetCurrentItem";
import * as startC from "../../stages/stageC1/start";
import { Hint } from "../plays/Hint";
import "./Next.css";
import { NextBlock } from "./NextBlock";

export function Next() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const availableNexts = item?.build.availableNexts ?? [];

  const selectedNext = item?.build.selectedNext;
  const selectedIndex = selectedNext ? availableNexts.indexOf(selectedNext) : 0;

  return (
    <div
      className={`footers-nexts-Next ${availableNexts.length ? "active" : ""} ${
        selectedNext?.enabled ? "enabled" : ""
      }`}
      onClick={() => {
        const nextIndex = (selectedIndex + 1) % availableNexts.length;

        setItem((item) => ({
          ...item,
          build: {
            ...item.build,
            selectedNext: availableNexts[nextIndex],
          },
        }));
      }}
    >
      <div className="items">
        {availableNexts.map((next, index) => (
          <div
            key={index}
            className={`item ${
              index < selectedIndex
                ? "left"
                : index > selectedIndex
                ? "right"
                : ""
            }`}
          >
            <NextBlock item={next} />
          </div>
        ))}
      </div>

      {item?.start === startC &&
        selectedNext?.blockType === BlockType.Domino &&
        !item.build.blocks.some(
          (block) => block.blockType === BlockType.Bridge
        ) && <Hint className="hint">Switch!</Hint>}
    </div>
  );
}
