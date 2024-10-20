import { Box, Line } from "@react-three/drei";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { PropsWithChildren, useState } from "react";
import { depth, height, width } from "../../dominos/FollowDomino";

export function NextDomino({ position, rotation, children }: Props) {
  const lineOffset = 0.2;
  const [dashOffset, setDashOffset] = useState(0);
  useFrame(({ clock }) => setDashOffset(clock.getElapsedTime()));

  return (
    <group position={position} rotation={rotation}>
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
        <meshToonMaterial color={0x4ecdc4} opacity={0.2} transparent={true} />
      </Box>

      {children}
    </group>
  );
}

interface Props extends PropsWithChildren {
  position: Vector3;
  rotation: Euler;
}
