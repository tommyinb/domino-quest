import { Box, Line } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Euler } from "three";
import { useTipped } from "./useTipped";

export function FollowDomino({ position, rotation, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  useTipped(ref, index);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody ref={ref} position={[0, 1, 0]} restitution={0}>
        <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
          <meshPhongMaterial color={0x3ebdb4} flatShading={true} />
        </Box>
      </RigidBody>

      <Line
        points={[
          [-width / 2, 0.1, -depth / 2],
          [width / 2, 0.1, -depth / 2],
          [width / 2, 0.1, depth / 2],
          [-width / 2, 0.1, depth / 2],
          [-width / 2, 0.1, -depth / 2],
        ]}
        position={[0, 0.5, 0]}
        color={0x3ebdb4}
        dashed={true}
        dashScale={1}
        dashOffset={0}
        lineWidth={1}
        opacity={0.3}
        transparent={true}
      />
    </group>
  );
}

interface Props {
  position: Vector3;
  rotation: Euler;

  index: number;
}

export const width = 15;
export const height = 30;
export const depth = 5;
