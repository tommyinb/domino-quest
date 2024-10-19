import { useContext, useMemo } from "react";
import { ControllerContext } from "./ControllerContext";

export function useCurrentItem() {
  const { items, currentLevel } = useContext(ControllerContext);

  return useMemo(
    () => items.find((item) => item.level === currentLevel),
    [currentLevel, items]
  );
}
