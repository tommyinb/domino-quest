import { useControls } from "leva";
import { MouseEventHandler, PropsWithChildren, useMemo, useState } from "react";
import { SceneContext } from "./SceneContext";

export function SceneProvider({ children }: PropsWithChildren) {
  const { debug } = useControls({ debug: false });

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
