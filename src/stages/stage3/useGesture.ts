import { useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { Vector2, Vector3 } from "three";
import { getSlotY } from "../../controllers/getSlotY";
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
  useSceneGesture(
    useCallback(
      (event) => {
        if (!clicking(event.pointers)) {
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
        } else {
          return false;
        }
      },
      [
        camera,
        item.level,
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
