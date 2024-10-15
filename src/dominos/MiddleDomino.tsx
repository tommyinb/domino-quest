import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useTipping } from "./useTipping";

export function MiddleDomino({ position, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  useTipping(ref, index);

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

export const width = 15;
export const height = 30;
export const depth = 5;
