import { useContext } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { NextHint } from "../stageA/NextHint";

export function NextHints({ inputSteer, targetSteer, ending }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return (
    <>
      <NextHint
        condition={blocks.length <= 1 && inputSteer === targetSteer}
        en="Press to build"
        zh="點擊以放下"
        ja="押して建てる"
      />

      <NextHint
        condition={inputSteer !== targetSteer}
        en={
          blocks.length === 5 && inputSteer === 0
            ? `Swipe right to steer`
            : blocks.length <= 8 && targetSteer === inputSteer - 1
            ? "Steer right"
            : `Swipe ${
                inputSteer - targetSteer > 0 ? "right" : "left"
              }\nto steer back`
        }
        zh={
          blocks.length === 5 && inputSteer === 0
            ? `向右滑動以轉向`
            : blocks.length <= 8 && targetSteer === inputSteer - 1
            ? "再向右轉"
            : `向${inputSteer - targetSteer > 0 ? "右" : "左"}滑動以回轉`
        }
        ja={
          blocks.length === 5 && inputSteer === 0
            ? `右にスワイプ\nすると曲がる`
            : blocks.length <= 8 && targetSteer === inputSteer - 1
            ? "また右に"
            : `ちょっと${inputSteer - targetSteer > 0 ? "右" : "左"}に戻して`
        }
      />

      <NextHint
        condition={ending}
        en="Last piece"
        zh="最後一塊"
        ja="最後のピース"
      />
    </>
  );
}

interface Props {
  inputSteer: number;
  targetSteer: number;

  ending: boolean;
}
