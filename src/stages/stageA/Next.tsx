import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { NextDomino } from "./NextDomino";
import { endPosition } from "./start";
import { useClick } from "./useClick";
import { useLastPosition } from "./useLastPosition";

export function Next() {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => lastPosition.clone().add(new Vector3(0, 0, -25)),
    [lastPosition]
  );

  const built = useBuilt();

  const ending = useClick(nextPosition, 0, endPosition);

  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, 0, 0]}>
          {blocks.length <= 1 && (
            <Hint position={[0, height, 0]}>Press to build</Hint>
          )}

          {blocks.length > 1 && blocks.length < 4 && (
            <Hint position={[0, height, 0]}>Press</Hint>
          )}

          {blocks.length === 4 && (
            <Hint position={[0, height, 0]}>Press...</Hint>
          )}

          {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
        </NextDomino>
      )}
    </>
  );
}
