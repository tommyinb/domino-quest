import { useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { Block } from "./block";
import { BlockType } from "./blockType";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { Play } from "./Play";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Stage() {
  const [state, setState] = useState(StageState.Building);
  useEffect(() => console.log("state", state), [state]);

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
        [blocks, state]
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
