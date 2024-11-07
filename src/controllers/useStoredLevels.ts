import { useEffect, useState } from "react";
import { getStages } from "./getStages";

export function useStoredLevels() {
  const storageKey = "controllers-useStoredLevels-1";

  const [levels, setLevels] = useState(() => {
    const stages = getStages();

    const text = localStorage.getItem(storageKey);
    if (!text) {
      return [stages[0].level];
    }

    const value = parseInt(text);

    const stage = stages.find((stage) => stage.level === value);
    if (!stage) {
      return [stages[0].level];
    }

    return [stage.level];
  });

  useEffect(() => {
    if (levels.length > 0) {
      const level = levels[levels.length - 1];
      localStorage.setItem(storageKey, level.toString());
    }
  }, [levels]);

  return { levels, setLevels };
}
