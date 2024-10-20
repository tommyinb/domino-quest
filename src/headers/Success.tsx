import { useContext } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import "./Success.css";

export function Success() {
  const { setCurrentLevel } = useContext(ControllerContext);

  const item = useCurrentItem();

  return (
    <div
      className={`headers-Success ${
        item?.state === ItemState.Success ? "active" : ""
      }`}
    >
      <div className="level">Level {item?.level}</div>

      <div className="content">
        <div className="state">Completed</div>
        <div className="description">{item?.start.description}</div>
      </div>

      <div
        className="button"
        onClick={() => setCurrentLevel((item?.level ?? 0) + 1)}
      >
        Next Level
      </div>
    </div>
  );
}
