import { useContext, useMemo } from "react";
import { BlockType } from "../blocks/blockType";
import { DominoType } from "../blocks/dominoType";
import { ItemState } from "../controllers/itemState";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { useSetCurrentItem } from "../controllers/useSetCurrentItem";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import { SettingContext } from "../settings/SettingContext";
import "./Failure.css";

export function Failure() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const built = useMemo(
    () =>
      item?.build.blocks.some(
        (block) =>
          block.blockType === BlockType.Domino &&
          block.dominoType === DominoType.Last
      ),
    [item?.build.blocks]
  );

  const { formActive } = useContext(SettingContext);

  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`headers-Failure ${
        item?.state === ItemState.Failure && !formActive ? "active" : ""
      }`}
    >
      <div className="content">
        <div className="level">
          <span className={`label ${language}`}>
            <Languaged en="Level" zh="關卡" ja="レベル" />
          </span>{" "}
          {item?.level}
        </div>

        <div className="message">
          {(item?.start.failureMessage && (
            <Languaged {...item.start.failureMessage} />
          )) ||
            (item?.start.name && <Languaged {...item.start.name} />)}
        </div>

        <div
          className={`button ${language}`}
          onClick={() =>
            setItem((item) => ({
              ...item,
              state: ItemState.Building,
              round: item.round + 1,
            }))
          }
        >
          {built ? (
            <Languaged en="Try again" zh="再試一次" ja="もう一回" />
          ) : (
            <Languaged en="Keep building" zh="繼續" ja="並べ続ける" />
          )}
        </div>
      </div>
    </div>
  );
}
