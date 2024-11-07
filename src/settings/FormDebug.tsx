import { useContext } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./FormDebug.css";
import { SettingContext } from "./SettingContext";

export function FormDebug() {
  const { debug, setDebug } = useContext(SettingContext);

  const { language } = useContext(LanguageContext);

  return (
    <div className="settings-FormDebug">
      <div className={`title ${language}`}>
        <Languaged en="Debug" zh="開心模式" ja="デバッグ" />
      </div>

      <div
        className={`content ${language} ${debug ? "active" : ""}`}
        onClick={() => setDebug(!debug)}
      >
        <div className="radio" />

        <div className="text">
          <Languaged en="Enable Mode" zh="程式猿體驗" ja="開発者モード" />
        </div>
      </div>
    </div>
  );
}
