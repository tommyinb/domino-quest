import { useMemo, useState } from "react";
import { Vector3 } from "three";
import { Block } from "./block";
import { BlockType } from "./blockType";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Play } from "./Play";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Stage({ state, setState }: Props) {
  const [blocks, setBlocks] = useState<Block[]>(() => [
    {
      type: BlockType.First,
      position: new Vector3(0, 0, 75),
    },
  ]);

  return (
    <StageContext.Provider
      value={useMemo(
        () => ({ state, setState, blocks, setBlocks }),
        [blocks, setState, state]
      )}
    >
      <group>
        <Ground />

        {state === StageState.Building && <Next />}

        <Play />
      </group>
    </StageContext.Provider>
  );
}

interface Props {
  state: StageState;
  setState: (state: StageState) => void;
}
