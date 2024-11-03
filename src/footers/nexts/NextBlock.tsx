import { ItemBuildNext } from "../../controllers/itemBuildNext";
import "./NextBlock.css";
import { Preview } from "./Preview";

export function NextBlock({ item }: Props) {
  return (
    <div className={`footers-nexts-NextBlock ${item.enabled ? "active" : ""}`}>
      <Preview blockType={item.blockType} />

      {item.limit && <div className="limit">{item.limit}</div>}
    </div>
  );
}

interface Props {
  item: ItemBuildNext;
}
