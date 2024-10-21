import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { useSetCurrentItem } from "../controllers/useSetCurrentItem";
import "./Failure.css";

export function Failure() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  return (
    <div
      className={`headers-Failure ${
        item?.state === ItemState.Failure ? "active" : ""
      }`}
    >
      <div className="content">
        <div className="level">Level {item?.level}</div>

        <div className="description">{item?.start.description}</div>

        <div
          className="button"
          onClick={() =>
            setItem((item) => ({
              ...item,
              state: ItemState.Building,
              round: item.round + 1,
            }))
          }
        >
          Try again
        </div>
      </div>
    </div>
  );
}
