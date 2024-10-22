import { useCallback } from "react";
import { clicking } from "./clicking";
import { GestureHandler } from "./gestureHandler";
import { useGesture } from "./useGesture";

export function useClick(handler: GestureHandler) {
  useGesture(
    useCallback(
      (event) => {
        if (clicking(event.pointers)) {
          return handler(event);
        } else {
          return false;
        }
      },
      [handler]
    )
  );
}
