import { Block } from "./block";
import { BlockType } from "./blockType";
import { DominoType } from "./dominoType";
import { FirstDomino } from "./FirstDomino";
import { FollowDomino } from "./FollowDomino";

export function Play({ block, index }: Props) {
  switch (block.blockType) {
    case BlockType.Domino:
      switch (block.dominoType) {
        case DominoType.First:
          <FirstDomino
            position={block.position}
            rotation={block.rotation}
            index={index}
          />;
          break;

        case DominoType.Middle:
        case DominoType.Last:
          return (
            <FollowDomino
              position={block.position}
              rotation={block.rotation}
              index={index}
            />
          );
      }
      break;
  }

  return <></>;
}

interface Props {
  block: Block;
  index: number;
}
