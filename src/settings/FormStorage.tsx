import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./FormStorage.css";
import { SettingContext } from "./SettingContext";

export function FormStorage() {
  const [selected, setSelected] = useState(false);

  const { debug, formActive } = useContext(SettingContext);

  useEffect(() => {
    if (selected) {
      if (!formActive) {
        localStorage.clear();

        location.reload();
      }
    }
  }, [formActive, selected]);

  const { language } = useContext(LanguageContext);

  return (
    <div className={`settings-FormStorage ${debug ? "active" : ""}`}>
      <div className="content">
        <div className={`title ${language}`}>
          <Languaged en="Storage" zh="存檔資料" ja="データ" />
        </div>

        <div
          className={`selection ${selected ? "selected" : ""} ${language}`}
          onClick={() => setSelected(!selected)}
        >
          <div className="box" />

          <div className="text">
            <Languaged en="Clear Data" zh="刪除紀錄" ja="削除する" />
          </div>
        </div>

        <div
          className={`description ${selected ? "selected" : ""} ${language}`}
        >
          <Languaged
            en="All progress will be lost"
            zh="將會清除所有進度"
            ja="進度が消えます"
          />
        </div>
      </div>
    </div>
  );
}
