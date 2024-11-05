import { useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  LegacyRef,
  RefAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Vector3, Vector3Tuple } from "three";
import { ControllerContext } from "../controllers/ControllerContext";
import { GestureMode } from "../controllers/gestureMode";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";

export function CameraControlAnimation({ lastTarget, setLastTarget }: Props) {
  const [animating, setAnimating] = useState(true);

  const { camera } = useThree();

  const currentItem = useCurrentItem();

  const { items, gestureMode } = useContext(ControllerContext);

  const nextTarget = useMemo<Vector3Tuple>(
    () => [
      0,
      items
        .filter((item) => item.level < (currentItem?.level ?? 0))
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
      0,
    ],
    [currentItem?.level, items]
  );

  const [{ target: currentTarget, position }] = useSpring(
    () => ({
      from: {
        target: lastTarget,
        position: camera.position.toArray(),
      },
      to: {
        target: nextTarget,
        position: [
          currentItem?.start.cameraPosition[0] ?? 0,
          (currentItem?.start.cameraPosition[1] ?? 0) + nextTarget[1],
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

      const [targetX, targetY, targetZ] = currentTarget.get();
      camera.lookAt(targetX, targetY, targetZ);
    }
  });

  const [targetX, targetY, targetZ] = currentTarget.get();
  const targetVector = useMemo(
    () => new Vector3(targetX, targetY, targetZ),
    [targetX, targetY, targetZ]
  );

  const [positionX, positionY, positionZ] = position.get();
  const positionVector = useMemo(
    () => new Vector3(positionX, positionY, positionZ),
    [positionX, positionY, positionZ]
  );

  useEffect(() => {
    if (!animating) {
      setLastTarget(nextTarget);
    }
  }, [animating, nextTarget, setLastTarget]);

  const ref = useRef<GetRefType<typeof OrbitControls>>(null);

  return (
    <OrbitControls
      ref={ref}
      target={targetVector}
      position={positionVector}
      onChange={() => {
        if (!animating && ref.current) {
          setLastTarget(ref.current.target.toArray());
        }
      }}
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

interface Props {
  lastTarget: Vector3Tuple;
  setLastTarget: (lastTarget: Vector3Tuple) => void;
}

export const transitionDuration = 500;

type GetRefType<T> = T extends React.ForwardRefExoticComponent<infer P>
  ? P extends RefAttributes<unknown>
    ? P["ref"] extends LegacyRef<infer K> | undefined
      ? K
      : never
    : never
  : never;
