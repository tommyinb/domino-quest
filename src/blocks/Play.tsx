import { Block } from "./block";
import { BlockType } from "./blockType";
import { Bridge } from "./Bridge";
import { DominoType } from "./dominoType";
import { FirstDomino } from "./FirstDomino";
import { FollowDomino } from "./FollowDomino";

export function Play({ block, index }: Props) {
  switch (block.blockType) {
    case BlockType.Domino:
      switch (block.dominoType) {
        case DominoType.First:
          return (
            <FirstDomino
              position={block.position}
              rotation={block.rotation}
              index={index}
            />
          );

        case DominoType.Middle:
        case DominoType.Last:
        default:
          return (
            <FollowDomino
              position={block.position}
              rotation={block.rotation}
              index={index}
            />
          );
      }

    case BlockType.Bridge:
      return (
        <Bridge
          position={block.position}
          rotation={block.rotation}
          length={block.length}
        />
      );
  }
}

interface Props {
  block: Block;
  index: number;
}
