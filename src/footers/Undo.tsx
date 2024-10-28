import { useCurrentItem } from "../controllers/useCurrentItem";
import "./Undo.css";

export function Undo() {
  const item = useCurrentItem();

  return (
    <div
      className={`footers-Undo ${
        item?.build.undoHandlers.length ? "active" : ""
      }`}
      onClick={() => {
        for (const handler of item?.build.undoHandlers ?? []) {
          handler();

          //TODO undo more if multiple clicks
        }
      }}
    />
  );
}
