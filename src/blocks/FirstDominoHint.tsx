import { useContext } from "react";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { useLanguaged } from "../languages/useLanguaged";
import { SettingContext } from "../settings/SettingContext";
import { height } from "./FollowDomino";
import { Hint } from "./Hint";
import { useBuilt } from "./useBuilt";

export function FirstDominoHint() {
  const { item } = useContext(SlotContext);

  const built = useBuilt();

  const { formActive } = useContext(SettingContext);

  const hint = useLanguaged(
    item.level <= 1
      ? {
          en: "Now, give it a push!",
          zh: "好！推一下！",
          ja: "倒してみよう！",
        }
      : {
          en: "Push!",
          zh: "推！",
          ja: "倒す！",
        }
  );

  return (
    <>
      {item.state === ItemState.Building && built && !formActive && (
        <Hint key={hint} position={[0, height, 0]}>
          {hint}
        </Hint>
      )}
    </>
  );
}
