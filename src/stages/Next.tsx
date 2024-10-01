import { Box, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { Vector3 } from "three";
import { depth, height, width } from "./Domino";

export function Next({ dominos, setDominos }: Props) {
  const position = useMemo(() => {
    const lastDomino = dominos[dominos.length - 1];
    return lastDomino.clone().add(new Vector3(0, 0, -2.5));
  }, [dominos]);

  const lineOffset = 0.2;

  const [dashOffset, setDashOffset] = useState(0);
  useFrame(({ clock }) => setDashOffset(clock.getElapsedTime()));

  return (
    <group
      position={position}
      onClick={() => setDominos([...dominos, position])}
    >
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

      <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
        <meshToonMaterial color={0x4ecdc4} opacity={0.1} transparent={true} />
      </Box>
    </group>
  );
}

interface Props {
  dominos: Vector3[];
  setDominos: (dominos: Vector3[]) => void;
}
