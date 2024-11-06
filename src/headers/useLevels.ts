import { useContext, useEffect, useState } from "react";
import { ControllerContext } from "../controllers/ControllerContext";

export function useLevels(capacity: number) {
  const { currentLevel } = useContext(ControllerContext);

  const [levels, setLevels] = useState<number[]>([]);

  useEffect(() => {
    setLevels((levels) =>
      levels.includes(currentLevel)
        ? levels
        : [...levels, currentLevel].slice(-capacity)
    );
  }, [capacity, currentLevel]);

  return levels;
}
