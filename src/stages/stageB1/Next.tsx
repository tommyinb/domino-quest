import { useCallback, useContext, useMemo, useState } from "react";
import { Euler } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotBlocks } from "../../controllers/useSetSlotBlocks";
import { clicking } from "../../scenes/clicking";
import { useGesture } from "../../scenes/useGesture";
import { SettingContext } from "../../settings/SettingContext";
import { NextDomino } from "../stageA/NextDomino";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "./getNextPosition";
import { NextHints } from "./NextHints";
import { endPosition, middlePosition, startPosition } from "./start";

export function Next() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const [inputSteer, setInputSteer] = useState(0);
  const targetSteer =
    blocks.length <= 4 ? 0 : blocks.length < 8 ? -(blocks.length - 4) : -4;

  const angle = useMemo(
    () =>
      Math.atan2(
        middlePosition[0] - startPosition[0],
        middlePosition[2] - startPosition[2]
      ) +
      inputSteer * (Math.PI / 9),
    [inputSteer]
  );

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => getNextPosition(lastPosition, 20, angle),
    [angle, lastPosition]
  );

  const ending = useMemo(
    () =>
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 20,
    [nextPosition]
  );

  const setBlocks = useSetSlotBlocks();
  const blockNext = useCallback(
    () =>
      setBlocks((blocks) => {
        if (blocks.some((block) => block.position.equals(nextPosition))) {
          return blocks;
        }

        return [
          ...blocks,
          {
            blockType: BlockType.Domino,
            dominoType: ending ? DominoType.Last : DominoType.Middle,
            position: nextPosition,
            rotation: new Euler(0, angle, 0),
          },
        ];
      }),
    [angle, ending, nextPosition, setBlocks]
  );

  const built = useBuilt();
  useGesture(
    useCallback(
      (event) => {
        if (item.state !== ItemState.Building || built) {
          return false;
        } else {
          const firstPointer = event.pointers[0];

          if (clicking(event.pointers)) {
            if (inputSteer === targetSteer) {
              blockNext();

              return true;
            } else {
              return false;
            }
          } else {
            if (blocks.length >= 5) {
              const lastPointer = event.pointers[event.pointers.length - 1];
              const moveX = lastPointer.clientX - firstPointer.clientX;

              if (moveX > 50) {
                setInputSteer((steer) => Math.max(steer - 1, -6));
              } else if (moveX < -50) {
                setInputSteer((steer) => Math.min(steer + 1, 6));
              }

              return true;
            } else {
              return false;
            }
          }
        }
      },
      [blockNext, blocks.length, built, inputSteer, item.state, targetSteer]
    )
  );

  const { formActive } = useContext(SettingContext);

  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, angle, 0]}>
          {!formActive && (
            <NextHints
              inputSteer={inputSteer}
              targetSteer={targetSteer}
              ending={ending}
            />
          )}
        </NextDomino>
      )}
    </>
  );
}
