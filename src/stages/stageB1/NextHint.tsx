import { useContext } from "react";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { SlotContext } from "../../controllers/SlotContext";

export function NextHint({ inputSteer, targetSteer, ending }: Props) {
  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  return (
    <>
      {blocks.length <= 1 && inputSteer === targetSteer && (
        <Hint
          position={[0, height, 0]}
          en="Press to build"
          zh="點擊以放下"
          ja="押して建てる"
        />
      )}

      {inputSteer !== targetSteer &&
        (blocks.length === 5 && inputSteer === 0 ? (
          <Hint
            position={[0, height, 0]}
            en="Swipe right to steer"
            zh="向右滑動以轉向"
            ja="右にスワイプ\nすると曲がる"
          />
        ) : blocks.length <= 8 && targetSteer === inputSteer - 1 ? (
          <Hint
            position={[0, height, 0]}
            en="Steer right"
            zh="再向右轉"
            ja="また右に"
          />
        ) : (
          <Hint
            position={[0, height, 0]}
            en={`Swipe ${
              inputSteer - targetSteer > 0 ? "right" : "left"
            }\nto steer back`}
            zh={`向${inputSteer - targetSteer > 0 ? "右" : "左"}滑動以回轉`}
            ja={`ちょっと${inputSteer - targetSteer > 0 ? "右" : "左"}に戻して`}
          />
        ))}

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
  inputSteer: number;
  targetSteer: number;

  ending: boolean;
}
