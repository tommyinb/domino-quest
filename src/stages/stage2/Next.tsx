import { useContext, useEffect, useMemo, useState } from "react";
import { Euler, Vector3 } from "three";
import { ControllerContext } from "../../controllers/ControllerContext";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { height } from "../../dominos/FollowDomino";
import { Hint } from "../../dominos/Hint";
import { SceneContext } from "../../scenes/SceneContext";
import { BlockType } from "../blockType";
import { NextDomino } from "../stage1/NextDomino";
import { StageContext } from "../StageContext";
import { endPosition, middlePosition, startPosition } from "./start";

export function Next() {
  const { blocks, setBlocks } = useContext(StageContext);

  const [inputSteer, setInputSteer] = useState(0);
  const targetSteer = blocks.length >= 5 && blocks.length <= 8 ? -1 : 0;

  const [fromAngle, setFromAngle] = useState(() =>
    Math.atan2(
      middlePosition[0] - startPosition[0],
      middlePosition[2] - startPosition[2]
    )
  );
  const toAngle = useMemo(
    () => fromAngle + inputSteer * (Math.PI / 9),
    [fromAngle, inputSteer]
  );

  const nextPosition = useMemo(
    () =>
      blocks[blocks.length - 1].position
        .clone()
        .add(new Vector3(Math.sin(toAngle) * 20, 0, Math.cos(toAngle) * 20)),
    [blocks, toAngle]
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

  const setSlotState = useSetSlotState();

  const { setClickHandles } = useContext(SceneContext);
  const { gestures, setGestures } = useContext(ControllerContext);
  useEffect(() => {
    const handle = () => {
      if (ending) {
        setBlocks([
          ...blocks,
          {
            type: BlockType.Last,
            position: nextPosition,
            rotation: new Euler(0, toAngle, 0),
          },
        ]);

        setSlotState(ItemState.Built);
      } else {
        if (inputSteer === targetSteer) {
          setBlocks([
            ...blocks,
            {
              type: BlockType.Middle,
              position: nextPosition,
              rotation: new Euler(0, toAngle, 0),
            },
          ]);

          setFromAngle(toAngle);
        }
      }
    };

    setClickHandles((handles) => [...handles, handle]);

    return () =>
      setClickHandles((handles) =>
        handles.filter((handle) => handle !== handle)
      );
  }, [
    blocks,
    ending,
    gestures.length,
    inputSteer,
    nextPosition,
    setBlocks,
    setClickHandles,
    setSlotState,
    targetSteer,
    toAngle,
  ]);

  const [pointerDown, setPointerDown] = useState<{
    pointerId: number;
    clientX: number;
  }>();

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
            setInputSteer((steer) => Math.max(steer - 1, -3));
          } else if (moveX < -50) {
            setInputSteer((steer) => Math.min(steer + 1, 3));
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
      <NextDomino position={nextPosition} rotation={[0, toAngle, 0]}>
        {inputSteer !== targetSteer && !ending && (
          <Hint position={[0, height, 0]}>{`${
            blocks.length === 5 ? "Press here,\nswipe" : "Swipe"
          } ${inputSteer - targetSteer > 0 ? "right" : "left"}\nto steer${
            blocks.length === 5 && inputSteer === 0 ? "" : " back"
          }`}</Hint>
        )}

        {blocks.length <= 1 && inputSteer === targetSteer && (
          <Hint position={[0, height, 0]}>Press to build</Hint>
        )}

        {blocks.length >= 5 && !ending && inputSteer === targetSteer && (
          <Hint position={[0, height, 0]}>Press</Hint>
        )}

        {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
      </NextDomino>
    </group>
  );
}
