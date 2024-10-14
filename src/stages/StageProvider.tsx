import { PropsWithChildren, useMemo, useState } from "react";
import { Vector3 } from "three";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function StageProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(StageState.Building);

  const [dominos, setDominos] = useState<Vector3[]>([]);

  return (
    <StageContext.Provider
      value={useMemo(
        () => ({
          state,
          setState,
          dominos,
          setDominos,
        }),
        [dominos, state]
      )}
    >
      {children}
    </StageContext.Provider>
  );
}
