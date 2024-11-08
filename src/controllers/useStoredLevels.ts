import { useEffect, useState } from "react";
import { getStarts } from "./getStarts";

export function useStoredLevels() {
  const storageKey = "controllers-useStoredLevels-1";

  const [levels, setLevels] = useState(() => {
    const starts = getStarts();

    const text = localStorage.getItem(storageKey);
    if (!text) {
      return [1];
    }

    const inputValue = parseInt(text);

    const outputValue = Math.min(
      Math.max(Math.floor(inputValue), 1),
      starts.length
    );

    return [outputValue];
  });

  useEffect(() => {
    if (levels.length > 0) {
      const level = levels[levels.length - 1];
      localStorage.setItem(storageKey, level.toString());
    }
  }, [levels]);

  return { levels, setLevels };
}
