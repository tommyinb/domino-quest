import { useCallback, useContext } from "react";
import { ControllerContext } from "./ControllerContext";

export function useSetCurrentLevel() {
  const { setLevels } = useContext(ControllerContext);

  return useCallback(
    (level: number) => {
      setLevels((levels) => [...levels.filter((l) => l !== level), level]);
    },
    [setLevels]
  );
}
