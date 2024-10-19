import { useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useState } from "react";
import { Vector3, Vector3Tuple } from "three";
import { ControllerContext } from "./ControllerContext";
import { slotHeight } from "./Slot";

export function CameraControl() {
  const [animating, setAnimating] = useState(true);

  const { camera } = useThree();

  const { currentLevel } = useContext(ControllerContext);

  const [{ targetY, position }] = useSpring(
    () => ({
      from: {
        targetY: Math.max(currentLevel - 2, 0) * slotHeight,
        position: camera.position.toArray(),
      },
      to: {
        targetY: (currentLevel - 1) * slotHeight,
        position: [
          cameraX,
          (currentLevel - 1) * slotHeight + cameraY,
          cameraZ,
        ] as Vector3Tuple,
      },
      onStart: () => setAnimating(true),
      onRest: () => setAnimating(false),
      config: { duration: currentLevel > 0 ? transitionDuration : 0 },
    }),
    [currentLevel]
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
      enabled={!animating}
    />
  );
}

export const cameraX = -75;
export const cameraY = 125;
export const cameraZ = 200;

export const transitionDuration = 500;
