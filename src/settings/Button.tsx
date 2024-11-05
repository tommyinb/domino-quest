import { useContext } from "react";
import "./Button.css";
import { SettingContext } from "./SettingContext";

export function Button() {
  const { formActive, setFormActive } = useContext(SettingContext);

  return (
    <div className="settings-Button" onClick={() => setFormActive(!formActive)}>
      <div className={`content ${!formActive ? "active" : ""}`} />
    </div>
  );
}
