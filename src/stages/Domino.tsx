import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

export function Domino({ position }: Props) {
  return (
    <group position={position}>
      <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
        <meshToonMaterial color={0x4ecdc4} />
      </Box>
    </group>
  );
}

interface Props {
  position: Vector3;
}

export const width = 3;
export const height = 6;
export const depth = 1;
