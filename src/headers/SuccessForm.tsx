import { useContext, useMemo } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { ItemState } from "../controllers/itemState";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import { SettingContext } from "../settings/SettingContext";
import "./SuccessForm.css";

export function SuccessForm({ level }: Props) {
  const { items, currentLevel, setCurrentLevel } =
    useContext(ControllerContext);

  const item = useMemo(
    () => items.find((item) => item.level === level),
    [items, level]
  );

  const maxLevel = useMemo(
    () => Math.max(...items.map((item) => item.level)),
    [items]
  );

  const { formActive } = useContext(SettingContext);

  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`headers-SuccessForm ${
        level === currentLevel &&
        item?.state === ItemState.Success &&
        !formActive
          ? "active"
          : ""
      }`}
    >
      <div className="level">
        <span className={`label ${language}`}>
          <Languaged en="Level" zh="關卡" ja="レベル" />
        </span>{" "}
        {level}
      </div>

      <div className="content">
        <div className="state">
          <Languaged en="Completed" zh="目標達成" ja="CLEAR!" />
        </div>

        <div className="message">
          {(item?.start.successMessage && (
            <Languaged {...item.start.successMessage} />
          )) ||
            (item?.start.name && <Languaged {...item.start.name} />)}
        </div>
      </div>

      {level < maxLevel && (
        <div
          className={`button ${language}`}
          onClick={() => setCurrentLevel(level + 1)}
        >
          <Languaged en="Next Level" zh="下一關" ja="次へ" />
        </div>
      )}
    </div>
  );
}

interface Props {
  level: number;
}
