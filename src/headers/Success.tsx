import { useContext, useMemo } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import "./Success.css";

export function Success() {
  const { items, setCurrentLevel } = useContext(ControllerContext);

  const item = useCurrentItem();

  const maxLevel = useMemo(
    () => Math.max(...items.map((item) => item.level)),
    [items]
  );

  return (
    <div
      className={`headers-Success ${
        item?.state === ItemState.Success ? "active" : ""
      }`}
    >
      <div className="level">Level {item?.level}</div>

      <div className="content">
        <div className="state">Completed</div>

        <div className="message">
          {item?.start.successMessage ?? item?.start.name}
        </div>
      </div>

      {item && item.level < maxLevel && (
        <div
          className="button"
          onClick={() => setCurrentLevel((item?.level ?? 0) + 1)}
        >
          Next Level
        </div>
      )}
    </div>
  );
}
