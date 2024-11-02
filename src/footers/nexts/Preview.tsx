import { BlockType } from "../../blocks/blockType";
import { PreviewBridge } from "./PreviewBridge";
import { PreviewDomino } from "./PreviewDomino";
import { Scene } from "./Scene";

export function Preview({ blockType }: Props) {
  return (
    <Scene>
      {blockType === BlockType.Domino && <PreviewDomino />}
      {blockType === BlockType.Bridge && <PreviewBridge />}
    </Scene>
  );
}

interface Props {
  blockType: BlockType;
}
