import { PointerEventHandler, useContext, useEffect, useRef } from "react";
import { GestureHandler } from "./gestureHandler";
import { SceneContext } from "./SceneContext";

export function useGesture(gestureHandler: GestureHandler) {
  const {
    setPointerDownHandlers,
    setPointerMoveHandlers,
    setPointerUpHandlers,
    setPointerCancelHandlers,
  } = useContext(SceneContext);

  const eventMap = useRef<Map<number, { clientX: number; clientY: number }[]>>(
    new Map()
  );

  useEffect(() => {
    const { current } = eventMap;

    const downHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      const oldPointers = current.get(inputEvent.pointerId);
      if (oldPointers) {
        oldPointers.push({
          clientX: inputEvent.clientX,
          clientY: inputEvent.clientY,
        });
      } else {
        current.set(inputEvent.pointerId, [
          { clientX: inputEvent.clientX, clientY: inputEvent.clientY },
        ]);
      }
    };
    setPointerDownHandlers((handlers) => [...handlers, downHandler]);

    const moveHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      const pointers = current.get(inputEvent.pointerId);
      if (pointers) {
        pointers.push({
          clientX: inputEvent.clientX,
          clientY: inputEvent.clientY,
        });
      }
    };
    setPointerMoveHandlers((handlers) => [...handlers, moveHandler]);

    const upHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      const pointers = current.get(inputEvent.pointerId);

      gestureHandler({
        pointerId: inputEvent.pointerId,
        pointers: [
          ...(pointers ?? []),
          { clientX: inputEvent.clientX, clientY: inputEvent.clientY },
        ],
      });

      current.delete(inputEvent.pointerId);
    };
    setPointerUpHandlers((handlers) => [...handlers, upHandler]);

    const cancelHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      current.delete(inputEvent.pointerId);
    };
    setPointerCancelHandlers((handlers) => [...handlers, cancelHandler]);

    return () => {
      setPointerDownHandlers((handlers) =>
        handlers.filter((handler) => handler !== downHandler)
      );

      setPointerMoveHandlers((handlers) =>
        handlers.filter((handler) => handler !== moveHandler)
      );

      setPointerUpHandlers((handlers) =>
        handlers.filter((handler) => handler !== upHandler)
      );

      setPointerCancelHandlers((handlers) =>
        handlers.filter((handler) => handler !== cancelHandler)
      );

      current.clear();
    };
  }, [
    gestureHandler,
    setPointerCancelHandlers,
    setPointerDownHandlers,
    setPointerMoveHandlers,
    setPointerUpHandlers,
  ]);
}
