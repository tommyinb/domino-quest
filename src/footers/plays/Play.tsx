import { useState } from "react";
import { ItemState } from "../../controllers/itemState";
import { useCurrentItem } from "../../controllers/useCurrentItem";
import { useSetCurrentItem } from "../../controllers/useSetCurrentItem";
import * as startB4 from "../../stages/stageB4/start";
import { Hint } from "./Hint";
import "./Play.css";

export function Play() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const [used, setUsed] = useState(false);

  return (
    <div
      className="footers-plays-Play"
      onClick={() => {
        setItem((item) => ({ ...item, state: ItemState.Playing }));

        setUsed(true);
      }}
    >
      {!used &&
        item?.start === startB4 &&
        item.build.blocks.length >= 10 &&
        item.build.blocks.length < 20 && (
          <Hint
            className="hint"
            en="Play to get a preview"
            zh="試推一下"
            ja="プレビューを見る"
          />
        )}
    </div>
  );
}
