import { useThree } from "@react-three/fiber";
import { useCallback, useContext } from "react";
import { Vector2, Vector3 } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { clicking } from "../../scenes/clicking";
import { useGesture as useSceneGesture } from "../../scenes/useGesture";

export function useGesture(
  lastPosition: Vector3,
  nextPosition: Vector3,
  steer: (side: number) => void
) {
  const { item } = useContext(SlotContext);

  const { camera, size } = useThree();

  const { items, gestureMode } = useContext(ControllerContext);

  const built = useBuilt();

  useSceneGesture(
    useCallback(
      (event) => {
        if (item.state !== ItemState.Building) {
          return false;
        }

        if (gestureMode !== GestureMode.Build) {
          return false;
        }

        if (built) {
          return false;
        }

        if (clicking(event.pointers)) {
          return false;
        }

        const firstPointer = event.pointers[0];
        const lastPointer = event.pointers[event.pointers.length - 1];
        const pointerVector = new Vector2(
          lastPointer.clientX - firstPointer.clientX,
          lastPointer.clientY - firstPointer.clientY
        );

        const slotY = items
          .filter((t) => t.level < item.level)
          .map((item) => item.start.stageHeight)
          .reduce((a, b) => a + b, 0);

        const lastPoint = new Vector3(
          lastPosition.x,
          lastPosition.y + slotY,
          lastPosition.z
        ).project(camera);

        const nextPoint = new Vector3(
          nextPosition.x,
          nextPosition.y + slotY,
          nextPosition.z
        ).project(camera);

        const directionProjected = new Vector2(
          (nextPoint.x - lastPoint.x) * size.width,
          -(nextPoint.y - lastPoint.y) * size.height
        );

        const cross = pointerVector
          .normalize()
          .cross(directionProjected.normalize());

        if (cross > 0.3) {
          steer(1);
        } else if (cross < -0.3) {
          steer(-1);
        }

        return true;
      },
      [
        built,
        camera,
        gestureMode,
        item.level,
        item.state,
        items,
        lastPosition.x,
        lastPosition.y,
        lastPosition.z,
        nextPosition.x,
        nextPosition.y,
        nextPosition.z,
        size.height,
        size.width,
        steer,
      ]
    )
  );
}
