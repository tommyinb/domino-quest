import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useRef } from "react";
import { StageContext } from "../stages/StageContext";
import { StageState } from "../stages/stageState";
import { depth, height, width } from "./MiddleDomino";
import { useTipping } from "./useTipping";

export function LastDomino({ position, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  const tipping = useTipping(ref, index);

  const { state, setState } = useContext(StageContext);
  useEffect(() => {
    if (state === StageState.Playing) {
      if (tipping) {
        setState(StageState.Success);
      }
    }
  }, [setState, state, tipping]);

  return (
    <RigidBody ref={ref} position={position}>
      <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
        <meshPhongMaterial color={0x5eddd4} flatShading={true} />
      </Box>
    </RigidBody>
  );
}

interface Props {
  position: Vector3;
  index: number;
}
