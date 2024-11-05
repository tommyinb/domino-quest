import { useContext, useMemo } from "react";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { SlotContext } from "../../controllers/SlotContext";
import { useLanguaged } from "../../languages/useLanguaged";

export function NextHints({ ending }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const hint = useLanguaged(
    useMemo(
      () =>
        blocks.length <= 1
          ? {
              en: "Press to build",
              zh: "點擊以放下",
              ja: "押して建てる",
            }
          : blocks.length < 4
          ? {
              en: "Press",
              zh: "點擊",
              ja: "押す",
            }
          : blocks.length === 4
          ? {
              en: "Press...",
              zh: "點擊...",
              ja: "押す...",
            }
          : ending
          ? {
              en: "Last piece",
              zh: "最後一塊",
              ja: "最後の",
            }
          : undefined,
      [blocks.length, ending]
    )
  );

  return <>{hint && <Hint position={[0, height, 0]}>{hint}</Hint>}</>;
}

interface Props {
  ending: boolean;
}
