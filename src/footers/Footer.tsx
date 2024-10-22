import { useContext, useEffect, useState } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { GestureMode } from "../controllers/gestureMode";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import "./Footer.css";

export function Footer() {
  const item = useCurrentItem();

  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    if (retrying) {
      const handlers = item?.build.retryHandlers ?? [];
      if (handlers) {
        const timer = setTimeout(() => {
          for (const handler of handlers) {
            handler();
          }

          setGestureMode(GestureMode.Build);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setRetrying(false);
      }
    }
  }, [item?.build.retryHandlers, retrying, setGestureMode]);

  return (
    <div
      className={`footers-Footer ${
        item?.state === ItemState.Building && item.level >= 3 ? "active" : ""
      }`}
    >
      <div className="content">
        <div
          className={`undo ${item?.build.undoHandlers.length ? "active" : ""}`}
          onClick={() => {
            for (const handler of item?.build.undoHandlers ?? []) {
              handler();
            }
          }}
        />

        <div
          className={`retry ${
            item?.build.retryHandlers.length ? "active" : ""
          } ${retrying ? "loading" : ""}`}
          onPointerDown={() => setRetrying(true)}
          onPointerOut={() => setRetrying(false)}
          onPointerUp={() => setRetrying(false)}
          onPointerCancel={() => setRetrying(false)}
        />

        <div
          className={`pen ${gestureMode === GestureMode.Build ? "active" : ""}`}
          onClick={() => setGestureMode(GestureMode.Build)}
        />

        <div
          className={`eye ${gestureMode === GestureMode.View ? "active" : ""}`}
          onClick={() => setGestureMode(GestureMode.View)}
        />
      </div>
    </div>
  );
}
