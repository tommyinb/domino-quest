import { useContext, useEffect, useState } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { GestureMode } from "../controllers/gestureMode";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { useSetCurrentItem } from "../controllers/useSetCurrentItem";
import "./Footer.css";

export function Footer() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    if (retrying) {
      const timer = setTimeout(() => {
        setItem((item) => ({
          ...item,
          blocks: item.blocks.slice(0, 1),
          state: ItemState.Building,
          round: item.round + 1,
        }));

        setGestureMode(GestureMode.Build);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [retrying, setGestureMode, setItem]);

  return (
    <div
      className={`footers-Footer ${
        item?.state === ItemState.Building && item.level >= 3 ? "active" : ""
      }`}
    >
      <div className="content">
        <div
          className={`undo ${
            (item?.blocks.length ?? 0) > 1 && gestureMode === GestureMode.Build
              ? "active"
              : ""
          }`}
          onClick={() =>
            setItem((item) =>
              item.blocks.length > 1
                ? {
                    ...item,
                    blocks: item.blocks.slice(0, -1),
                  }
                : item
            )
          }
        />

        <div
          className={`retry ${(item?.blocks.length ?? 0) > 1 ? "active" : ""} ${
            retrying ? "loading" : ""
          }`}
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
