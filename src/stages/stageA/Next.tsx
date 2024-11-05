import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { SettingContext } from "../../settings/SettingContext";
import { NextDomino } from "./NextDomino";
import { NextHints } from "./NextHints";
import { endPosition } from "./start";
import { useClick } from "./useClick";
import { useLastPosition } from "./useLastPosition";

export function Next() {
  const { item } = useContext(SlotContext);

  const lastPosition = useLastPosition();
  const nextPosition = useMemo(
    () => lastPosition.clone().add(new Vector3(0, 0, -25)),
    [lastPosition]
  );

  const ending = useClick(nextPosition, 0, endPosition);

  const built = useBuilt();

  const { formActive } = useContext(SettingContext);

  return (
    <>
      {item.state === ItemState.Building && !built && (
        <NextDomino position={nextPosition} rotation={[0, 0, 0]}>
          {!formActive && <NextHints ending={ending} />}
        </NextDomino>
      )}
    </>
  );
}
