import { Physics } from "@react-three/rapier";
import { useContext } from "react";
import { SceneContext } from "../scenes/SceneContext";
import { ControllerContext } from "./ControllerContext";
import { Sky } from "./Sky";
import { Slot } from "./Slot";

export function Controller() {
  const { items } = useContext(ControllerContext);

  const { debug } = useContext(SceneContext);

  return (
    <>
      <Sky />

      <Physics debug={debug} gravity={[0, -400, 0]}>
        {items.map((item) => (
          <Slot key={item.level} item={item} />
        ))}
      </Physics>
    </>
  );
}
