import { useCallback, useContext, useMemo, useState } from "react";
import { Vector3 } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { height } from "../../dominos/FollowDomino";
import { Hint } from "../../dominos/Hint";
import { clicking } from "../../scenes/clicking";
import { useGesture } from "../../scenes/useGesture";
import { NextDomino } from "../stage1/NextDomino";
import { useNextClick } from "../stage1/useNextClick";
import { endPosition, middlePosition, startPosition } from "./start";

export function Next() {
  const { item } = useContext(SlotContext);
  const { blocks } = item;

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

  const nextPosition = useMemo(
    () =>
      (blocks[blocks.length - 1]?.position ?? new Vector3())
        .clone()
        .add(
          new Vector3(Math.sin(angle), 0, Math.cos(angle)).multiplyScalar(20)
        ),
    [angle, blocks]
  );

  const ending = useNextClick(nextPosition, endPosition);

  useGesture(
    useCallback(
      (event) => {
        if (!clicking(event.pointers)) {
          if (blocks.length >= 5) {
            const firstPointer = event.pointers[0];
            const lastPointer = event.pointers[event.pointers.length - 1];
            const moveX = lastPointer.clientX - firstPointer.clientX;

            if (moveX > 50) {
              setInputSteer((steer) => Math.max(steer - 1, -6));
            } else if (moveX < -50) {
              setInputSteer((steer) => Math.min(steer + 1, 6));
            }
          }
        }
      },
      [blocks.length]
    )
  );

  return (
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
  );
}
