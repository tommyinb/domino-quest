import { useContext, useEffect, useMemo, useState } from "react";
import { Euler, Vector3, Vector3Tuple } from "three";
import { ControllerContext } from "../../controllers/ControllerContext";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { SceneContext } from "../../scenes/SceneContext";
import { BlockType } from "../blockType";
import { NextDomino } from "../stage1/NextDomino";
import { StageContext } from "../StageContext";

export function Next({ stationPositions }: Props) {
  const { blocks, setBlocks } = useContext(StageContext);

  const [angle, setAngle] = useState(() => {
    const startPosition = stationPositions[0];
    const secondPosition = stationPositions[1];

    return Math.atan2(
      secondPosition[0] - startPosition[0],
      secondPosition[2] - startPosition[2]
    );
  });

  const nextPosition = useMemo(
    () =>
      blocks[blocks.length - 1].position
        .clone()
        .add(new Vector3(Math.sin(angle) * 20, 0, Math.cos(angle) * 20)),
    [angle, blocks]
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

  const setSlotState = useSetSlotState();

  const { setClickHandles } = useContext(SceneContext);
  useEffect(() => {
    const handle = () => {
      if (ending) {
        setBlocks([
          ...blocks,
          {
            type: BlockType.Last,
            position: nextPosition,
            rotation: new Euler(0, angle, 0),
          },
        ]);

        setSlotState(ItemState.Built);
      } else {
        setBlocks([
          ...blocks,
          {
            type: BlockType.Middle,
            position: nextPosition,
            rotation: new Euler(0, angle, 0),
          },
        ]);
      }
    };

    setClickHandles((handles) => [...handles, handle]);

    return () =>
      setClickHandles((handles) =>
        handles.filter((handle) => handle !== handle)
      );
  }, [
    angle,
    blocks,
    ending,
    nextPosition,
    setBlocks,
    setClickHandles,
    setSlotState,
  ]);

  const [pointerDown, setPointerDown] = useState<{
    pointerId: number;
    clientX: number;
  }>();

  const { setGestures } = useContext(ControllerContext);

  return (
    <group
      onPointerDown={(event) => {
        (event.target as HTMLDivElement).setPointerCapture(event.pointerId);

        setPointerDown({
          pointerId: event.pointerId,
          clientX: event.clientX,
        });
      }}
      onPointerMove={(event) => {
        if (event.pointerId === pointerDown?.pointerId) {
          setGestures((disables) => [...disables, `steer-${event.pointerId}`]);
        }
      }}
      onPointerUp={(event) => {
        setGestures((disables) =>
          disables.filter((disable) => disable !== `steer-${event.pointerId}`)
        );

        if (event.pointerId === pointerDown?.pointerId) {
          const moveX = event.clientX - pointerDown.clientX;

          if (moveX > 50) {
            setAngle((angle) => angle - Math.PI / 9);
          } else if (moveX < -50) {
            setAngle((angle) => angle + Math.PI / 9);
          }

          setPointerDown(undefined);
        }
      }}
      onPointerCancel={(event) => {
        setGestures((disables) =>
          disables.filter((disable) => disable !== `steer-${event.pointerId}`)
        );

        if (event.pointerId === pointerDown?.pointerId) {
          setPointerDown(undefined);
        }
      }}
    >
      <NextDomino position={nextPosition} rotation={[0, angle, 0]}></NextDomino>
    </group>
  );
}

interface Props {
  stationPositions: Vector3Tuple[];
}
