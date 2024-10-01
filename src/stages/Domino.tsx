import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

export function Domino({ position }: Props) {
  const ref = useRef<RapierRigidBody>(null);

  const [hovered, setHovered] = useState(false);

  return (
    <RigidBody ref={ref} position={position}>
      <Box
        args={[width, height, depth]}
        position={[0, height / 2, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          ref.current?.applyImpulse({ x: 0, y: 0, z: -100000 }, true);
        }}
      >
        <meshPhongMaterial
          color={hovered ? 0x5eddd4 : 0x68c3c0}
          flatShading={true}
        />
      </Box>
    </RigidBody>
  );
}

interface Props {
  position: Vector3;
}

export const width = 15;
export const height = 30;
export const depth = 5;
