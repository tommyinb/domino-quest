import { useContext, useMemo } from "react";
import { ControllerContext } from "./ControllerContext";
import { useCurrentLevel } from "./useCurrentLevel";

export function useCurrentItem() {
  const { items } = useContext(ControllerContext);

  const level = useCurrentLevel();

  return useMemo(
    () => items.find((item) => item.level === level),
    [items, level]
  );
}
