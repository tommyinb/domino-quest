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

    const downHandler: PointerEventHandler<HTMLDivElement> = (event) => {
      const oldPointers = current.get(event.pointerId);
      if (oldPointers) {
        oldPointers.push({
          clientX: event.clientX,
          clientY: event.clientY,
        });
      } else {
        current.set(event.pointerId, [
          { clientX: event.clientX, clientY: event.clientY },
        ]);
      }
    };
    setPointerDownHandlers((handlers) => [...handlers, downHandler]);

    const moveHandler: PointerEventHandler<HTMLDivElement> = (event) => {
      const pointers = current.get(event.pointerId);
      if (pointers) {
        pointers.push({
          clientX: event.clientX,
          clientY: event.clientY,
        });
      }
    };
    setPointerMoveHandlers((handlers) => [...handlers, moveHandler]);

    const upHandler: PointerEventHandler<HTMLDivElement> = (event) => {
      const pointers = current.get(event.pointerId);

      if (
        gestureHandler({
          pointerId: event.pointerId,
          pointers: [
            ...(pointers ?? []),
            { clientX: event.clientX, clientY: event.clientY },
          ],
        })
      ) {
        event.preventDefault();
      }

      current.delete(event.pointerId);
    };
    setPointerUpHandlers((handlers) => [...handlers, upHandler]);

    const cancelHandler: PointerEventHandler<HTMLDivElement> = (event) => {
      current.delete(event.pointerId);
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
