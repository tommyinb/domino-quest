import {
  PointerEventHandler,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { SceneContext } from "./SceneContext";

export function SceneProvider({ children }: PropsWithChildren) {
  const [pointerDownHandlers, setPointerDownHandlers] = useState<
    PointerEventHandler<HTMLDivElement>[]
  >([]);
  const [pointerMoveHandlers, setPointerMoveHandlers] = useState<
    PointerEventHandler<HTMLDivElement>[]
  >([]);
  const [pointerUpHandlers, setPointerUpHandlers] = useState<
    PointerEventHandler<HTMLDivElement>[]
  >([]);
  const [pointerCancelHandlers, setPointerCancelHandlers] = useState<
    PointerEventHandler<HTMLDivElement>[]
  >([]);

  return (
    <SceneContext.Provider
      value={useMemo(
        () => ({
          pointerDownHandlers,
          setPointerDownHandlers,
          pointerMoveHandlers,
          setPointerMoveHandlers,
          pointerUpHandlers,
          setPointerUpHandlers,
          pointerCancelHandlers,
          setPointerCancelHandlers,
        }),
        [
          pointerCancelHandlers,
          pointerDownHandlers,
          pointerMoveHandlers,
          pointerUpHandlers,
        ]
      )}
    >
      {children}
    </SceneContext.Provider>
  );
}
