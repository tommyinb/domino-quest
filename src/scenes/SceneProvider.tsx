import { useControls } from "leva";
import { PropsWithChildren, useMemo, useState } from "react";
import { SceneContext } from "./SceneContext";

export function SceneProvider({ children }: PropsWithChildren) {
  const { debug } = useControls({ debug: false });

  const [orbitControlEnabled, setOrbitControlEnabled] = useState(true);

  return (
    <SceneContext.Provider
      value={useMemo(
        () => ({ debug, orbitControlEnabled, setOrbitControlEnabled }),
        [debug, orbitControlEnabled]
      )}
    >
      {children}
    </SceneContext.Provider>
  );
}
