import { useCallback, useContext, useMemo, useState } from "react";
import { Euler } from "three";
import { BlockType } from "../../blocks/blockType";
import { DominoType } from "../../blocks/dominoType";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { clicking } from "../../scenes/clicking";
import { useGesture } from "../../scenes/useGesture";
import { NextDomino } from "../stageA/NextDomino";
import { useLastPosition } from "../stageA/useLastPosition";
import { getNextPosition } from "./getNextPosition";
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

  const setSlotItem = useSetSlotItem();
  const blockNext = useCallback(
    () =>
      setSlotItem((item) => {
        if (
          item.build.blocks.some((block) => block.position.equals(nextPosition))
        ) {
          return item;
        } else {
          return {
            ...item,
            build: {
              ...item.build,
              blocks: [
                ...item.build.blocks,
                {
                  blockType: BlockType.Domino,
                  dominoType: ending ? DominoType.Last : DominoType.Middle,
                  position: nextPosition,
                  rotation: new Euler(0, angle, 0),
                },
              ],
            },
          };
        }
      }),
    [angle, ending, nextPosition, setSlotItem]
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

  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, angle, 0]}>
          {blocks.length <= 1 && inputSteer === targetSteer && (
            <Hint position={[0, height, 0]}>Press to build</Hint>
          )}

          {inputSteer !== targetSteer &&
            (blocks.length === 5 && inputSteer === 0 ? (
              <Hint position={[0, height, 0]}>{`Swipe right\nto steer`}</Hint>
            ) : blocks.length <= 8 && targetSteer === inputSteer - 1 ? (
              <Hint position={[0, height, 0]}>{`Steer right`}</Hint>
            ) : (
              <Hint position={[0, height, 0]}>{`Swipe ${
                inputSteer - targetSteer > 0 ? "right" : "left"
              }\nto steer back`}</Hint>
            ))}

          {blocks.length >= 5 && !ending && inputSteer === targetSteer && (
            <Hint position={[0, height, 0]}>Press</Hint>
          )}

          {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
        </NextDomino>
      )}
    </>
  );
}
