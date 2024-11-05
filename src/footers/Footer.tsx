import { useContext } from "react";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { SettingContext } from "../settings/SettingContext";
import "./Footer.css";
import { Retry } from "./histories/Retry";
import { Undo } from "./histories/Undo";
import { Next } from "./nexts/Next";
import { Play } from "./plays/Play";
import { Build } from "./views/Build";
import { View } from "./views/View";

export function Footer() {
  const item = useCurrentItem();

  const { formActive } = useContext(SettingContext);

  return (
    <div
      className={`footers-Footer ${
        item?.state === ItemState.Building && item.level >= 3 && !formActive
          ? "active"
          : ""
      }`}
    >
      <div className="content">
        <Next />

        <Undo />
        <Retry />

        <Play />

        <Build />
        <View />
      </div>
    </div>
  );
}
