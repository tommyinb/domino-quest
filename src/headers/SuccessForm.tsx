import { useContext, useMemo } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { ItemState } from "../controllers/itemState";
import { useCurrentLevel } from "../controllers/useCurrentLevel";
import { useSetCurrentLevel } from "../controllers/useSetCurrentLevel";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import { SettingContext } from "../settings/SettingContext";
import "./SuccessForm.css";

export function SuccessForm({ level: formLevel }: Props) {
  const { items } = useContext(ControllerContext);

  const item = useMemo(
    () => items.find((item) => item.level === formLevel),
    [items, formLevel]
  );

  const currentLevel = useCurrentLevel();
  const setCurrentLevel = useSetCurrentLevel();

  const maxLevel = useMemo(
    () => Math.max(...items.map((item) => item.level)),
    [items]
  );

  const { formActive } = useContext(SettingContext);

  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`headers-SuccessForm ${
        formLevel === currentLevel &&
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
        {formLevel}
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

      {formLevel < maxLevel && (
        <div
          className={`next ${language}`}
          onClick={() => setCurrentLevel(formLevel + 1)}
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
