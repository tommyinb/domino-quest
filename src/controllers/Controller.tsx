import { Physics } from "@react-three/rapier";
import { useContext, useMemo, useState } from "react";
import { SceneContext } from "../scenes/SceneContext";
import { StageState } from "../stages/stageState";
import { CameraControl } from "./CameraControl";
import { ControllerContext } from "./ControllerContext";
import { Item } from "./item";
import { Sky } from "./Sky";
import { Slot } from "./Slot";

export function Controller() {
  const [items, setItems] = useState<Item[]>(() => [
    {
      majorLevel: 1,
      minorLevel: 1,
      state: StageState.Building,
    },
    {
      majorLevel: 1,
      minorLevel: 2,
      state: StageState.Idle,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { debug } = useContext(SceneContext);

  return (
    <ControllerContext.Provider
      value={useMemo(
        () => ({ items, setItems, currentIndex, setCurrentIndex }),
        [currentIndex, items]
      )}
    >
      <Sky />

      <Physics debug={debug} gravity={[0, -400, 0]}>
        {items.map((item, index) => (
          <Slot
            key={`${index}-${item.majorLevel}-${item.minorLevel}`}
            index={index}
          />
        ))}
      </Physics>

      <CameraControl key={currentIndex} />
    </ControllerContext.Provider>
  );
}
