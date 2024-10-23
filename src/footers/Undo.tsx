import { useContext } from "react";
import { FooterContext } from "./FooterContext";
import "./Undo.css";

export function Undo() {
  const { undoHandlers } = useContext(FooterContext);

  return (
    <div
      className={`footers-Undo ${undoHandlers.length ? "active" : ""}`}
      onClick={() => {
        for (const handler of undoHandlers) {
          handler();

          //TODO undo more if multiple clicks
        }
      }}
    />
  );
}
