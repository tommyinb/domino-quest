import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useRef, useState } from "react";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Domino({ position }: Props) {
  const ref = useRef<RapierRigidBody>(null);

  const [hovered, setHovered] = useState(false);

  const { state } = useContext(StageContext);

  return (
    <RigidBody ref={ref} position={position}>
      <Box
        args={[width, height, depth]}
        position={[0, height / 2, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          if (state === StageState.Built) {
            ref.current?.applyImpulse({ x: 0, y: 0, z: -100000 }, true);
          }
        }}
      >
        <meshPhongMaterial
          color={hovered ? 0x6eede4 : 0x5eddd4}
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
