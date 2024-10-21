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
    const downHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      const oldPointers = eventMap.current.get(inputEvent.pointerId);
      if (oldPointers) {
        oldPointers.push({
          clientX: inputEvent.clientX,
          clientY: inputEvent.clientY,
        });
      } else {
        eventMap.current.set(inputEvent.pointerId, [
          { clientX: inputEvent.clientX, clientY: inputEvent.clientY },
        ]);
      }
    };
    setPointerDownHandlers((oldHandlers) => [...oldHandlers, downHandler]);

    const moveHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      const oldPointers = eventMap.current.get(inputEvent.pointerId);
      if (oldPointers) {
        oldPointers.push({
          clientX: inputEvent.clientX,
          clientY: inputEvent.clientY,
        });
      }
    };
    setPointerMoveHandlers((oldHandlers) => [...oldHandlers, moveHandler]);

    const upHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      const oldPointers = eventMap.current.get(inputEvent.pointerId);

      gestureHandler({
        pointerId: inputEvent.pointerId,
        pointers: [
          ...(oldPointers ?? []),
          { clientX: inputEvent.clientX, clientY: inputEvent.clientY },
        ],
      });

      eventMap.current.delete(inputEvent.pointerId);
    };
    setPointerUpHandlers((oldHandlers) => [...oldHandlers, upHandler]);

    const cancelHandler: PointerEventHandler<HTMLDivElement> = (inputEvent) => {
      eventMap.current.delete(inputEvent.pointerId);
    };
    setPointerCancelHandlers((oldHandlers) => [...oldHandlers, cancelHandler]);

    return () => {
      setPointerDownHandlers((oldHandlers) =>
        oldHandlers.filter((handler) => handler !== downHandler)
      );

      setPointerMoveHandlers((oldHandlers) =>
        oldHandlers.filter((handler) => handler !== moveHandler)
      );

      setPointerUpHandlers((oldHandlers) =>
        oldHandlers.filter((handler) => handler !== upHandler)
      );

      setPointerCancelHandlers((oldHandlers) =>
        oldHandlers.filter((handler) => handler !== cancelHandler)
      );
    };
  }, [
    gestureHandler,
    setPointerCancelHandlers,
    setPointerDownHandlers,
    setPointerMoveHandlers,
    setPointerUpHandlers,
  ]);
}
