import { useContext } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./FormLanguage.css";

export function FormLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="settings-FormLanguage">
      <div className={`title ${language}`}>
        <Languaged en="Language" zh="語言" ja="言語" />
      </div>

      <div className="content">
        <div
          className={`en ${language === "en" ? "active" : ""}`}
          onClick={() => setLanguage("en")}
        >
          Eng
        </div>

        <div
          className={`ja ${language === "ja" ? "active" : ""}`}
          onClick={() => setLanguage("ja")}
        >
          日
        </div>

        <div
          className={`zh ${language === "zh" ? "active" : ""}`}
          onClick={() => setLanguage("zh")}
        >
          中
        </div>
      </div>
    </div>
  );
}
