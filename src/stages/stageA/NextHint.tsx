import { useContext } from "react";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { SlotContext } from "../../controllers/SlotContext";

export function NextHint({ ending }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return (
    <>
      {blocks.length <= 1 && (
        <Hint
          position={[0, height, 0]}
          en="Press to build"
          zh="點擊以放下"
          ja="押して建てる"
        />
      )}

      {blocks.length > 1 && blocks.length < 4 && (
        <Hint position={[0, height, 0]} en="Press" zh="點擊" ja="押す" />
      )}

      {blocks.length === 4 && (
        <Hint
          position={[0, height, 0]}
          en="Press..."
          zh="點擊..."
          ja="押す..."
        />
      )}

      {ending && (
        <Hint
          position={[0, height, 0]}
          en="Last piece"
          zh="最後一塊"
          ja="最後のピース"
        />
      )}
    </>
  );
}

interface Props {
  ending: boolean;
}
