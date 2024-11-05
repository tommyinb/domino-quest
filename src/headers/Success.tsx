import { useContext, useMemo } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import { SettingContext } from "../settings/SettingContext";
import "./Success.css";

export function Success() {
  const { items, setCurrentLevel } = useContext(ControllerContext);

  const item = useCurrentItem();

  const maxLevel = useMemo(
    () => Math.max(...items.map((item) => item.level)),
    [items]
  );

  const { formActive } = useContext(SettingContext);

  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`headers-Success ${
        item?.state === ItemState.Success && !formActive ? "active" : ""
      }`}
    >
      <div className="level">
        <span className={`label ${language}`}>
          <Languaged en="Level" zh="關卡" ja="レベル" />
        </span>{" "}
        {item?.level}
      </div>

      <div className="content">
        <div className="state">
          <Languaged en="Completed" zh="目標達成" ja="クリア" />
        </div>

        <div className="message">
          {item?.start.successMessage ?? item?.start.name}
        </div>
      </div>

      {item && item.level < maxLevel && (
        <div
          className={`button ${language}`}
          onClick={() => setCurrentLevel((item?.level ?? 0) + 1)}
        >
          <Languaged en="Next Level" zh="下一關" ja="次へ" />
        </div>
      )}
    </div>
  );
}
