import { useCallback } from "react";
import { GestureHandler } from "./gestureHandler";
import { useGesture } from "./useGesture";

export function useClick(handler: GestureHandler) {
  useGesture(
    useCallback(
      (event) => {
        const firstPointer = event.pointers[0];

        if (
          event.pointers.some(
            (pointer) =>
              Math.abs(pointer.clientX - firstPointer.clientX) > tolerance ||
              Math.abs(pointer.clientY - firstPointer.clientY) > tolerance
          )
        ) {
          return;
        }

        handler(event);
      },
      [handler]
    )
  );
}

export const tolerance = 20;
