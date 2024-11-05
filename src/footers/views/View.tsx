import { useContext, useState } from "react";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { useCurrentItem } from "../../controllers/useCurrentItem";
import { useSetCurrentItem } from "../../controllers/useSetCurrentItem";
import * as startB4 from "../../stages/stageB4/start";
import { Hint } from "../plays/Hint";
import "./View.css";

export function View() {
  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const [lastClick, setLastClick] = useState(0);

  const [used, setUsed] = useState(false);

  return (
    <div
      className={`footers-views-View ${
        gestureMode === GestureMode.View ? "active" : ""
      }`}
      onClick={() => {
        setGestureMode(GestureMode.View);

        const time = Date.now();
        if (time - lastClick > 700) {
          setLastClick(time);
        } else {
          setItem((item) => ({
            ...item,
            build: {
              ...item.build,
              view: item.build.view + 1,
            },
          }));

          setLastClick(0);
        }

        setUsed(true);
      }}
    >
      {!used && item?.start === startB4 && item.build.blocks.length >= 20 && (
        <Hint className="hint">Change the view angle</Hint>
      )}
    </div>
  );
}
