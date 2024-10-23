import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { Build } from "./Build";
import "./Footer.css";
import { Play } from "./Play";
import { Retry } from "./Retry";
import { Undo } from "./Undo";
import { View } from "./View";

export function Footer() {
  const item = useCurrentItem();

  return (
    <div
      className={`footers-Footer ${
        item?.state === ItemState.Building && item.level >= 3 ? "active" : ""
      }`}
    >
      <div className="content">
        <Undo />
        <Retry />

        <Play />

        <Build />
        <View />
      </div>
    </div>
  );
}
