import { Box, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { Hint } from "../dominos/Hint";
import { depth, height, width } from "../dominos/MiddleDomino";
import { SceneContext } from "../scenes/SceneContext";
import { BlockType } from "./blockType";
import { endName } from "./Ground";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Next() {
  const { setState, blocks, setBlocks } = useContext(StageContext);

  const [direction] = useState(new Vector3(0, 0, -25));
  const position = useMemo(() => {
    const last = blocks[blocks.length - 1];
    return last?.position.clone().add(direction) ?? direction;
  }, [direction, blocks]);

  const lineOffset = 0.2;
  const [dashOffset, setDashOffset] = useState(0);
  useFrame(({ clock }) => setDashOffset(clock.getElapsedTime()));

  const [ending, setEnding] = useState(false);
  const addDomino = useCallback(() => {
    if (ending) {
      setBlocks([...blocks, { type: BlockType.Last, position }]);

      setState(StageState.Built);
    } else {
      setBlocks([...blocks, { type: BlockType.Middle, position }]);
    }
  }, [blocks, ending, position, setBlocks, setState]);

  const { setClickHandles } = useContext(SceneContext);
  useEffect(() => {
    setClickHandles((handles) => [...handles, addDomino]);

    return () =>
      setClickHandles((handles) =>
        handles.filter((handle) => handle !== addDomino)
      );
  }, [addDomino, setClickHandles]);

  return (
    <>
      <group position={position}>
        <Line
          points={[
            [-width / 2 - lineOffset, 0.1, -depth / 2 - lineOffset],
            [width / 2 + lineOffset, 0.1, -depth / 2 - lineOffset],
            [width / 2 + lineOffset, 0.1, depth / 2 + lineOffset],
            [-width / 2 - lineOffset, 0.1, depth / 2 + lineOffset],
            [-width / 2 - lineOffset, 0.1, -depth / 2 - lineOffset],
          ]}
          color={0x4ecdc4}
          dashed={true}
          dashScale={8}
          dashOffset={dashOffset}
          lineWidth={2}
        />

        {blocks.length <= 1 && (
          <Hint position={[0, height, 0]}>Press to build</Hint>
        )}

        {blocks.length > 1 && blocks.length < 4 && (
          <Hint position={[0, height, 0]}>Press</Hint>
        )}

        {blocks.length === 4 && <Hint position={[0, height, 0]}>Press...</Hint>}

        {ending && <Hint position={[0, height, 0]}>Last piece</Hint>}
      </group>

      <RigidBody
        key={position.toArray().join(",")}
        position={position}
        solverGroups={1}
        gravityScale={0}
        enabledTranslations={[false, false, false]}
        enabledRotations={[false, false, false]}
        onIntersectionEnter={(payload) => {
          if (payload.colliderObject?.name === endName) {
            setEnding(true);
          }
        }}
        onIntersectionExit={(payload) => {
          if (payload.rigidBodyObject?.name === endName) {
            setEnding(false);
          }
        }}
      >
        <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
          <meshToonMaterial color={0x4ecdc4} opacity={0.2} transparent={true} />
        </Box>
      </RigidBody>
    </>
  );
}
