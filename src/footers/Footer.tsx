import { useContext, useEffect, useState } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { GestureMode } from "../controllers/gestureMode";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { useSetCurrentItem } from "../controllers/useSetCurrentItem";
import "./Footer.css";
import { FooterContext } from "./FooterContext";

export function Footer() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const { undoHandlers, retryHandlers } = useContext(FooterContext);

  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    if (retrying) {
      if (retryHandlers.length) {
        const timer = setTimeout(() => {
          for (const handler of retryHandlers) {
            handler();
          }

          setGestureMode(GestureMode.Build);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setRetrying(false);
      }
    }
  }, [retryHandlers, retrying, setGestureMode]);

  //TODO change to build mode if multiple clicks in camera mode

  return (
    <div
      className={`footers-Footer ${
        item?.state === ItemState.Building && item.level >= 3 ? "active" : ""
      }`}
    >
      <div className="content">
        <div
          className={`undo ${undoHandlers.length ? "active" : ""}`}
          onClick={() => {
            for (const handler of undoHandlers) {
              handler(); //TODO undo more if multiple clicks
            }
          }}
        />

        <div
          className={`retry ${retryHandlers.length ? "active" : ""} ${
            retrying ? "loading" : ""
          }`}
          onPointerDown={() => setRetrying(true)}
          onPointerOut={() => setRetrying(false)}
          onPointerUp={() => setRetrying(false)}
          onPointerCancel={() => setRetrying(false)}
        />

        <div
          className="play"
          onClick={() => {
            setItem((item) => ({ ...item, state: ItemState.Playing }));
          }}
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
