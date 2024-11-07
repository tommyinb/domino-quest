import { useContext, useMemo } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { useCurrentLevel } from "../controllers/useCurrentLevel";
import { useSetCurrentLevel } from "../controllers/useSetCurrentLevel";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./FormLevel.css";

export function FormLevel() {
  const currentLevel = useCurrentLevel();
  const setCurrentLevel = useSetCurrentLevel();

  const { items } = useContext(ControllerContext);

  const minLevel = useMemo(
    () => Math.min(...items.map((item) => item.level)),
    [items]
  );
  const maxLevel = useMemo(
    () => Math.max(...items.map((item) => item.level)),
    [items]
  );

  const { language } = useContext(LanguageContext);

  return (
    <div className="settings-FormLevel">
      <div className={`title ${language}`}>
        <Languaged en="Level" zh="關卡" ja="レベル" />
      </div>

      <div className="content">
        <div
          className={`left ${currentLevel > minLevel ? "active" : ""}`}
          onClick={() => setCurrentLevel(currentLevel - 1)}
        />

        <div className="level">{currentLevel}</div>

        <div
          className={`right ${currentLevel < maxLevel ? "active" : ""}`}
          onClick={() => setCurrentLevel(currentLevel + 1)}
        />
      </div>
    </div>
  );
}
