import { useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { Vector2, Vector3 } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { getSlotY } from "../../controllers/getSlotY";
import { ItemState } from "../../controllers/itemState";
import { SlotContext } from "../../controllers/SlotContext";
import { clicking } from "../../scenes/clicking";
import { useGesture as useSceneGesture } from "../../scenes/useGesture";

export function useGesture(
  lastPosition: Vector3,
  nextPosition: Vector3,
  setAngle: Dispatch<SetStateAction<number>>
) {
  const { item } = useContext(SlotContext);

  const { camera, size } = useThree();

  const { gestureMode } = useContext(ControllerContext);

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

        const slotY = getSlotY(item.level);
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
          setAngle((angle) => angle + Math.PI / 9);
        } else if (cross < -0.3) {
          setAngle((angle) => angle - Math.PI / 9);
        }

        return true;
      },
      [
        built,
        camera,
        gestureMode,
        item.level,
        item.state,
        lastPosition.x,
        lastPosition.y,
        lastPosition.z,
        nextPosition.x,
        nextPosition.y,
        nextPosition.z,
        setAngle,
        size.height,
        size.width,
      ]
    )
  );
}
