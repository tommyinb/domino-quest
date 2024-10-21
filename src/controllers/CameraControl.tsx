import { useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useState } from "react";
import { Vector3 } from "three";
import { ControllerContext } from "./ControllerContext";
import { GestureMode } from "./gestureMode";
import { ItemState } from "./itemState";
import { slotHeight } from "./Slot";
import { useCurrentItem } from "./useCurrentItem";

export function CameraControl() {
  const [animating, setAnimating] = useState(true);

  const { camera } = useThree();

  const currentItem = useCurrentItem();

  const [{ targetY, position }] = useSpring(
    () => ({
      from: {
        targetY: Math.max((currentItem?.level ?? 0) - 2, 0) * slotHeight,
        position: camera.position.toArray(),
      },
      to: {
        targetY: ((currentItem?.level ?? 0) - 1) * slotHeight,
        position: [
          currentItem?.start.cameraPosition[0] ?? 0,
          ((currentItem?.level ?? 0) - 1) * slotHeight +
            (currentItem?.start.cameraPosition[1] ?? 0),
          currentItem?.start.cameraPosition[2] ?? 0,
        ],
      },
      onStart: () => setAnimating(true),
      onRest: () => setAnimating(false),
      config: {
        duration: (currentItem?.level ?? 0) > 0 ? transitionDuration : 0,
      },
    }),
    []
  );

  useFrame(() => {
    if (animating) {
      const [positionX, positionY, positionZ] = position.get();
      camera.position.set(positionX, positionY, positionZ);

      camera.lookAt(0, targetY.get(), 0);
    }
  });

  const { gestureMode } = useContext(ControllerContext);

  return (
    <OrbitControls
      target={[0, targetY.get(), 0]}
      position={new Vector3(...position.get())}
      enabled={
        !animating &&
        (((currentItem?.level ?? 0) >= 3 &&
          (currentItem?.state === ItemState.Playing ||
            currentItem?.state === ItemState.Success ||
            currentItem?.state === ItemState.Failure)) ||
          gestureMode === GestureMode.View)
      }
    />
  );
}

export const transitionDuration = 500;
