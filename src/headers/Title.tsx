import { useContext } from "react";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./Title.css";

export function Title() {
  const item = useCurrentItem();

  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`headers-Title ${
        item && item.level > 1 && item.state !== ItemState.Success
          ? "active"
          : ""
      }`}
    >
      <div className="level">
        <span className={`label ${language}`}>
          <Languaged en="Level" zh="關卡" ja="レベル" />
        </span>{" "}
        {item?.level}
        {item?.start.name && (
          <>
            {" - "}
            <span className={`name ${language}`}>{item.start.name}</span>
          </>
        )}
      </div>
    </div>
  );
}
