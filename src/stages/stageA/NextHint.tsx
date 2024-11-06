import { ReactNode } from "react";
import { height } from "../../blocks/FollowDomino";
import { Hint } from "../../blocks/Hint";
import { Language } from "../../languages/language";
import { useLanguaged } from "../../languages/useLanguaged";

export function NextHint(props: Props) {
  const content = useLanguaged(props);

  return (
    <>{props.condition && <Hint position={[0, height, 0]}>{content}</Hint>}</>
  );
}

interface Props extends Record<Language, ReactNode> {
  condition: boolean;
}
