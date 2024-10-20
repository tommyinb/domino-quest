import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import "./Title.css";

export function Title() {
  const item = useCurrentItem();

  return (
    <div
      className={`headers-Title ${
        item && item.level > 1 && item.state !== ItemState.Success
          ? "active"
          : ""
      }`}
    >
      <div className="level">Level {item?.level}</div>
    </div>
  );
}
