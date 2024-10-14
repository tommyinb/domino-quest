import { Box, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Vector3 } from "three";
import { SceneContext } from "../scenes/SceneContext";
import { depth, height, width } from "./Domino";
import { endName } from "./Ground";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Next() {
  const {
    setState,
    dominos: points,
    setDominos: setPoints,
  } = useContext(StageContext);

  const [direction] = useState(new Vector3(0, 0, -25));
  const position = useMemo(() => {
    const last = points[points.length - 1];
    return last?.clone().add(direction) ?? direction;
  }, [direction, points]);

  const lineOffset = 0.2;
  const [dashOffset, setDashOffset] = useState(0);
  useFrame(({ clock }) => setDashOffset(clock.getElapsedTime()));

  const [ending, setEnding] = useState(false);
  const addDomino = useCallback(() => {
    setPoints([...points, position]);

    if (ending) {
      setState(StageState.Built);
    }
  }, [ending, points, position, setPoints, setState]);

  const { setClickHandles } = useContext(SceneContext);
  useEffect(() => {
    setClickHandles((handles) => [...handles, addDomino]);

    return () =>
      setClickHandles((handles) =>
        handles.filter((handle) => handle !== addDomino)
      );
  }, [addDomino, setClickHandles]);

  const ref = useRef<RapierRigidBody>(null);
  useFrame(() => {
    ref.current?.setNextKinematicTranslation(position);
  });

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
      </group>

      <RigidBody
        key={position.toArray().join(",")}
        ref={ref}
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
