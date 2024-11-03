import { useContext, useState } from "react";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { useCurrentItem } from "../../controllers/useCurrentItem";
import * as startB4 from "../../stages/stageB4/start";
import { Hint } from "../plays/Hint";
import "./View.css";

export function View() {
  const item = useCurrentItem();

  const { gestureMode, setGestureMode } = useContext(ControllerContext);

  const [used, setUsed] = useState(false);

  //TODO change to build mode if multiple clicks in camera mode

  return (
    <div
      className={`footers-views-View ${
        gestureMode === GestureMode.View ? "active" : ""
      }`}
      onClick={() => {
        setGestureMode(GestureMode.View);

        setUsed(true);
      }}
    >
      {!used && item?.start === startB4 && item.build.blocks.length >= 20 && (
        <Hint className="hint">Change the view angle</Hint>
      )}
    </div>
  );
}
