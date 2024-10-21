import {
  PointerEventHandler,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SceneContext } from "./SceneContext";

export function SceneProvider({ children }: PropsWithChildren) {
  const [debug, setDebug] = useState(false);
  useEffect(() => {
    Object.assign(window, { setDebug });

    return () => {
      Object.assign(window, { setDebug: undefined });
    };
  }, []);

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
          debug,
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
          debug,
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
