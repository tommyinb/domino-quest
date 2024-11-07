import { useContext, useState } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./FormStorage.css";

export function FormStorage() {
  const [selected, setSelected] = useState(false);

  const { language } = useContext(LanguageContext);

  return (
    <div className="settings-FormStorage">
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
      </div>

      <div className={`description ${selected ? "active" : ""} ${language}`}>
        <Languaged
          en="Deleted on form close"
          zh="確認後刪除"
          ja="設定すると削除されます"
        />
      </div>
    </div>
  );
}
