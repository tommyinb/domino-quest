import { useContext } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { NextHint } from "./NextHint";

export function NextHints({ ending }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return (
    <>
      <NextHint
        condition={blocks.length <= 1}
        en="Press to build"
        zh="點擊以放下"
        ja="押して建てる"
      />

      <NextHint
        condition={blocks.length > 1 && blocks.length < 4}
        en="Press"
        zh="點擊"
        ja="押す"
      />

      <NextHint
        condition={blocks.length === 4}
        en="Press..."
        zh="點擊..."
        ja="押す..."
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
  ending: boolean;
}
