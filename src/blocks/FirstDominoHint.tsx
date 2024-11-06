import { useContext } from "react";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { SettingContext } from "../settings/SettingContext";
import { height } from "./FollowDomino";
import { Hint } from "./Hint";
import { useBuilt } from "./useBuilt";

export function FirstDominoHint() {
  const { item } = useContext(SlotContext);

  const built = useBuilt();

  const { formActive } = useContext(SettingContext);

  return (
    <>
      {item.state === ItemState.Building &&
        built &&
        !formActive &&
        (item.level <= 1 ? (
          <Hint
            key={0}
            position={[0, height, 0]}
            en="Now, give it a push!"
            zh="好！推一下！"
            ja="倒してみよう！"
          />
        ) : (
          <Hint
            key={1}
            position={[0, height, 0]}
            en="Push!"
            zh="推！"
            ja="倒す！"
          />
        ))}
    </>
  );
}
