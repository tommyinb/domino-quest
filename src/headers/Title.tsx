import { useCurrentItem } from "../controllers/useCurrentItem";
import { StageState } from "../stages/stageState";
import "./Title.css";

export function Title() {
  const item = useCurrentItem();

  return (
    <div
      className={`headers-Title ${
        item && item.level > 1 && item.state !== StageState.Success
          ? "active"
          : ""
      }`}
    >
      <div className="level">Level {item?.level}</div>
    </div>
  );
}
