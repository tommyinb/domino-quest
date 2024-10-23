import { useContext, useEffect, useState } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { GestureMode } from "../controllers/gestureMode";
import { FooterContext } from "./FooterContext";
import "./Retry.css";

export function Retry() {
  const { retryHandlers } = useContext(FooterContext);

  const { setGestureMode } = useContext(ControllerContext);

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

  return (
    <div
      className={`footers-Retry ${retryHandlers.length ? "active" : ""} ${
        retrying ? "loading" : ""
      }`}
      onPointerDown={() => setRetrying(true)}
      onPointerOut={() => setRetrying(false)}
      onPointerUp={() => setRetrying(false)}
      onPointerCancel={() => setRetrying(false)}
    />
  );
}
