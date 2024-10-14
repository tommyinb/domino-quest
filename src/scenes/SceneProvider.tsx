import { useControls } from "leva";
import { MouseEventHandler, PropsWithChildren, useMemo, useState } from "react";
import { SceneContext } from "./SceneContext";

export function SceneProvider({ children }: PropsWithChildren) {
  const { debug } = useControls({ debug: false });

  const [clickHandles, setClickHandles] = useState<
    MouseEventHandler<HTMLDivElement>[]
  >([]);

  const [orbitControlDisables, setOrbitControlDisables] = useState<unknown[]>(
    []
  );

  return (
    <SceneContext.Provider
      value={useMemo(
        () => ({
          debug,
          clickHandles,
          setClickHandles,
          orbitControlDisables,
          setOrbitControlDisables,
        }),
        [clickHandles, debug, orbitControlDisables]
      )}
    >
      {children}
    </SceneContext.Provider>
  );
}
