import { BlockType } from "../../blocks/blockType";
import { PreviewBridge } from "./PreviewBridge";
import { PreviewDomino } from "./PreviewDomino";
import { PreviewScene } from "./PreviewScene";

export function Preview({ blockType }: Props) {
  return (
    <PreviewScene>
      {blockType === BlockType.Domino && <PreviewDomino />}
      {blockType === BlockType.Bridge && <PreviewBridge />}
    </PreviewScene>
  );
}

interface Props {
  blockType: BlockType;
}
