import {
  MouseEventHandler,
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

  const [clickHandles, setClickHandles] = useState<
    MouseEventHandler<HTMLDivElement>[]
  >([]);

  return (
    <SceneContext.Provider
      value={useMemo(
        () => ({
          debug,
          clickHandles,
          setClickHandles,
        }),
        [clickHandles, debug]
      )}
    >
      {children}
    </SceneContext.Provider>
  );
}
