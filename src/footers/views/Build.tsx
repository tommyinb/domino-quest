import { useCallback, useContext, useEffect, useState } from "react";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { clicking } from "../../scenes/clicking";
import { useGesture } from "../../scenes/useGesture";
import "./Build.css";

export function Build() {
  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  const [clicks, setClicks] = useState<number[]>([]);

  useGesture(
    useCallback(
      (event) => {
        if (clicking(event.pointers)) {
          if (gestureMode === GestureMode.View) {
            const time = Date.now();

            const closeClicks = clicks.filter((click) => time - click < 3000);
            if (closeClicks.length >= 3) {
              setGestureMode(GestureMode.Build);
              return true;
            } else {
              setClicks((clicks) => [...clicks, time]);
              return false;
            }
          } else {
            return false;
          }
        } else {
          setClicks([]);
          return false;
        }
      },
      [clicks, gestureMode, setGestureMode]
    )
  );

  useEffect(() => {
    if (gestureMode === GestureMode.Build) {
      setClicks([]);
    }
  }, [gestureMode]);

  return (
    <div
      className={`footers-views-Build ${
        gestureMode === GestureMode.Build ? "active" : ""
      }`}
      onClick={() => setGestureMode(GestureMode.Build)}
    />
  );
}
