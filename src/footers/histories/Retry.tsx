import { useContext, useEffect, useMemo, useState } from "react";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { useCurrentItem } from "../../controllers/useCurrentItem";
import "./Retry.css";

export function Retry() {
  const item = useCurrentItem();
  const handlers = useMemo(
    () => item?.build.retryHandlers ?? [],
    [item?.build.retryHandlers]
  );

  const { setGestureMode } = useContext(ControllerContext);

  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    if (retrying) {
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
  }, [handlers, retrying, setGestureMode]);

  return (
    <div
      className={`footers-histories-Retry ${handlers.length ? "active" : ""} ${
        retrying ? "loading" : ""
      }`}
      onPointerDown={() => setRetrying(true)}
      onPointerOut={() => setRetrying(false)}
      onPointerUp={() => setRetrying(false)}
      onPointerCancel={() => setRetrying(false)}
    />
  );
}
