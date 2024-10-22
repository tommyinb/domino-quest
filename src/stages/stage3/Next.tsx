import { useThree } from "@react-three/fiber";
import { useCallback, useContext, useMemo, useState } from "react";
import { Euler, Vector2, Vector3, Vector3Tuple } from "three";
import { getSlotY } from "../../controllers/getSlotY";
import { SlotContext } from "../../controllers/SlotContext";
import { useSetSlotItem } from "../../controllers/useSetSlotItem";
import { BlockType } from "../../dominos/blockType";
import { tolerance } from "../../scenes/useClick";
import { useGesture } from "../../scenes/useGesture";
import { NextDomino } from "../stage1/NextDomino";

export function Next({ stationPositions }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item;

  const [angle, setAngle] = useState(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    return Math.atan2(
      secondPosition[0] - startPosition[0],
      secondPosition[2] - startPosition[2]
    );
  });
  const direction = useMemo(
    () => new Vector3(Math.sin(angle) * 20, 0, Math.cos(angle) * 20),
    [angle]
  );

  const lastPosition = useMemo(
    () => blocks[blocks.length - 1]?.position ?? new Vector3(),
    [blocks]
  );
  const nextPosition = useMemo(
    () => lastPosition.clone().add(direction),
    [direction, lastPosition]
  );

  const ending = useMemo(() => {
    const endPosition = stationPositions[stationPositions.length - 1];

    return (
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 20
    );
  }, [nextPosition, stationPositions]);

  const setSlotItem = useSetSlotItem();
  const blockNext = useCallback(
    () =>
      setSlotItem((item) => ({
        ...item,
        blocks: [
          ...item.blocks,
          {
            type: ending ? BlockType.Last : BlockType.Middle,
            position: nextPosition,
            rotation: new Euler(0, angle, 0),
          },
        ],
      })),
    [angle, ending, nextPosition, setSlotItem]
  );

  const { camera, size } = useThree();
  useGesture(
    useCallback(
      (event) => {
        const firstPointer = event.pointers[0];

        if (
          event.pointers.every(
            (pointer) =>
              Math.abs(pointer.clientX - firstPointer.clientX) <= tolerance &&
              Math.abs(pointer.clientY - firstPointer.clientY) <= tolerance
          )
        ) {
          blockNext();
        } else {
          const lastPointer = event.pointers[event.pointers.length - 1];
          const pointerVector = new Vector2(
            lastPointer.clientX - firstPointer.clientX,
            lastPointer.clientY - firstPointer.clientY
          );

          const slotY = getSlotY(item.level);
          const lastPoint = new Vector3(
            lastPosition.x,
            lastPosition.y + slotY,
            lastPosition.z
          ).project(camera);

          const nextPoint = new Vector3(
            nextPosition.x,
            nextPosition.y + slotY,
            nextPosition.z
          ).project(camera);

          const directionProjected = new Vector2(
            (nextPoint.x - lastPoint.x) * size.width,
            -(nextPoint.y - lastPoint.y) * size.height
          );

          const cross = pointerVector
            .normalize()
            .cross(directionProjected.normalize());

          if (cross > 0.3) {
            setAngle((angle) => angle + Math.PI / 9);
          } else if (cross < -0.3) {
            setAngle((angle) => angle - Math.PI / 9);
          }
        }
      },
      [
        blockNext,
        camera,
        item.level,
        lastPosition.x,
        lastPosition.y,
        lastPosition.z,
        nextPosition.x,
        nextPosition.y,
        nextPosition.z,
        size.height,
        size.width,
      ]
    )
  );

  return <NextDomino position={nextPosition} rotation={[0, angle, 0]} />;
}

interface Props {
  stationPositions: Vector3Tuple[];
}
