import { useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useMemo, useState } from "react";
import { Vector3 } from "three";
import { ControllerContext } from "./ControllerContext";
import { GestureMode } from "./gestureMode";
import { ItemState } from "./itemState";
import { useCurrentItem } from "./useCurrentItem";

export function CameraControl() {
  const [animating, setAnimating] = useState(true);

  const { camera } = useThree();

  const currentItem = useCurrentItem();

  const { items, gestureMode } = useContext(ControllerContext);

  const beforeItems = useMemo(
    () => items.filter((item) => item.level < (currentItem?.level ?? 0)),
    [currentItem?.level, items]
  );
  const fromY = useMemo(
    () =>
      beforeItems
        .slice(0, -1)
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
    [beforeItems]
  );
  const toY = useMemo(
    () =>
      beforeItems
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
    [beforeItems]
  );

  const [{ targetY, position }] = useSpring(
    () => ({
      from: {
        targetY: fromY,
        position: camera.position.toArray(),
      },
      to: {
        targetY: toY,
        position: [
          currentItem?.start.cameraPosition[0] ?? 0,
          (currentItem?.start.cameraPosition[1] ?? 0) + toY,
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
