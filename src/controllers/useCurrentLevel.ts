import { useContext } from "react";
import { ControllerContext } from "./ControllerContext";

export function useCurrentLevel() {
  const { levels } = useContext(ControllerContext);

  if (levels.length <= 0) {
    return -1;
  }

  return levels[levels.length - 1];
}
