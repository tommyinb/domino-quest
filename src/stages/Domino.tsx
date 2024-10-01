import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

export function Domino({ position }: Props) {
  const ref = useRef<RapierRigidBody>(null);

  const [hovered, setHovered] = useState(false);

  const [pushed, setPushed] = useState(false);

  return (
    <RigidBody ref={ref} position={position}>
      <Box
        args={[width, height, depth]}
        position={[0, height / 2, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          if (!pushed) {
            ref.current?.applyImpulse({ x: 0, y: 0, z: -10 }, true);

            setPushed(true);
          }
        }}
      >
        <meshToonMaterial color={hovered ? 0x5eddd4 : 0x4ecdc4} />
      </Box>
    </RigidBody>
  );
}

interface Props {
  position: Vector3;
}

export const width = 1.5;
export const height = 3;
export const depth = 0.5;
