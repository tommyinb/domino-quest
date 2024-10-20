import { useContext, useEffect, useMemo } from "react";
import { Euler, Vector3 } from "three";
import { ItemState } from "../../controllers/itemState";
import { useSetSlotState } from "../../controllers/useSetSlotState";
import { height } from "../../dominos/FollowDomino";
import { Hint } from "../../dominos/Hint";
import { SceneContext } from "../../scenes/SceneContext";
import { BlockType } from "../blockType";
import { StageContext } from "../StageContext";
import { NextDomino } from "./NextDomino";
import { endPosition } from "./start";

export function Next() {
  const { blocks, setBlocks } = useContext(StageContext);

  const nextPosition = useMemo(
    () =>
      blocks[blocks.length - 1].position.clone().add(new Vector3(0, 0, -25)),
    [blocks]
  );

  const ending = useMemo(
    () =>
      Math.abs(nextPosition.y - endPosition[1]) <= 5 &&
      Math.sqrt(
        Math.pow(nextPosition.x - endPosition[0], 2) +
          Math.pow(nextPosition.z - endPosition[2], 2)
      ) <= 2,
    [nextPosition]
  );

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
            rotation: new Euler(),
          },
        ]);

        setSlotState(ItemState.Built);
      } else {
        setBlocks([
          ...blocks,
          {
            type: BlockType.Middle,
            position: nextPosition,
            rotation: new Euler(),
          },
        ]);
      }
    };

    setClickHandles((handles) => [...handles, handle]);

    return () =>
      setClickHandles((handles) =>
        handles.filter((handle) => handle !== handle)
      );
  }, [blocks, ending, nextPosition, setBlocks, setClickHandles, setSlotState]);

  return (
    <NextDomino position={nextPosition} rotation={[0, 0, 0]}>
      {blocks.length <= 1 && (
        <Hint position={[0, height, 0]}>Press to build</Hint>
      )}

      {blocks.length > 1 && blocks.length < 4 && (
        <Hint position={[0, height, 0]}>Press</Hint>
      )}

      {blocks.length === 4 && <Hint position={[0, height, 0]}>Press...</Hint>}

      {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
    </NextDomino>
  );
}
