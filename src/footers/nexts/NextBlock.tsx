import { BlockType } from "../../blocks/blockType";
import "./NextBlock.css";
import { Preview } from "./Preview";

export function NextBlock({ blockType, limit }: Props) {
  return (
    <div className="footers-nexts-NextBlock">
      <Preview blockType={blockType} />

      {limit && <div className="limit">{limit}</div>}
    </div>
  );
}

interface Props {
  blockType: BlockType;
  limit: number | undefined;
}
