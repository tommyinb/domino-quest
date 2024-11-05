import { useState } from "react";
import { Vector3Tuple } from "three";
import { CameraControlAnimation } from "./CameraControlAnimation";
import { useCurrentItem } from "./useCurrentItem";

export function CameraControl() {
  const item = useCurrentItem();

  const [lastTarget, setLastTarget] = useState<Vector3Tuple>([0, 0, 0]);

  return (
    <CameraControlAnimation
      key={`${item?.level}-${item?.build.view}`}
      lastTarget={lastTarget}
      setLastTarget={setLastTarget}
    />
  );
}
