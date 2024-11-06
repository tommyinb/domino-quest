import { useContext } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./Form.css";
import { FormLanguage } from "./FormLanguage";
import { FormLevel } from "./FormLevel";
import { SettingContext } from "./SettingContext";

export function Form() {
  const { formActive, setFormActive } = useContext(SettingContext);

  const { language } = useContext(LanguageContext);

  return (
    <div className={`settings-Form ${formActive ? "active" : ""}`}>
      <div className="content">
        <FormLanguage />

        <FormLevel />
      </div>

      <div
        className={`close ${language}`}
        onClick={() => setFormActive(!formActive)}
      >
        <Languaged en="Okay" zh="確定" ja="設定する" />
      </div>
    </div>
  );
}
