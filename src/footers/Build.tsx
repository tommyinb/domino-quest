import { useContext } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { GestureMode } from "../controllers/gestureMode";
import "./Build.css";

export function Build() {
  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  return (
    <div
      className={`footers-Build ${
        gestureMode === GestureMode.Build ? "active" : ""
      }`}
      onClick={() => setGestureMode(GestureMode.Build)}
    />
  );
}
