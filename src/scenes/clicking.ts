import { GestureEvent } from "./gestureEvent";

export function clicking(pointers: GestureEvent["pointers"]) {
  const firstPointer = pointers[0];

  return !pointers.some(
    (pointer) =>
      Math.abs(pointer.clientX - firstPointer.clientX) > tolerance ||
      Math.abs(pointer.clientY - firstPointer.clientY) > tolerance
  );
}

export const tolerance = 20;
