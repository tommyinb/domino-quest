import { useContext } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { StageState } from "../stages/stageState";
import "./Success.css";

export function Success() {
  const { setCurrentLevel } = useContext(ControllerContext);

  const item = useCurrentItem();

  return (
    <div
      className={`headers-Success ${
        item?.state === StageState.Success ? "active" : ""
      }`}
    >
      <div className="success">
        <div className="level">Level {item?.level}</div>
        <div className="state">Completed</div>
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
