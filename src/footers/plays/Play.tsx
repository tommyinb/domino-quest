import { useState } from "react";
import { ItemState } from "../../controllers/itemState";
import { useCurrentItem } from "../../controllers/useCurrentItem";
import { useSetCurrentItem } from "../../controllers/useSetCurrentItem";
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
        item?.level === 5 &&
        item.build.blocks.length >= 10 &&
        item.build.blocks.length < 20 && (
          <Hint className="hint">Play to get a preview</Hint>
        )}
    </div>
  );
}
