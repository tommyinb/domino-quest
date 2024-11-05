import { Physics } from "@react-three/rapier";
import { useContext } from "react";
import { SettingContext } from "../settings/SettingContext";
import { ControllerContext } from "./ControllerContext";
import { Sky } from "./Sky";
import { Slot } from "./Slot";

export function Controller() {
  const { items } = useContext(ControllerContext);

  const { debug } = useContext(SettingContext);

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
