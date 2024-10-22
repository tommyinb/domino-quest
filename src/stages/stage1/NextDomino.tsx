import { Box, Line } from "@react-three/drei";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { PropsWithChildren, useContext, useState } from "react";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { depth, height, width } from "../../dominos/FollowDomino";

export function NextDomino({ position, rotation, children }: Props) {
  const { gestureMode } = useContext(ControllerContext);

  const [dashOffset, setDashOffset] = useState(0);
  useFrame(({ clock }) => setDashOffset(clock.getElapsedTime()));

  return (
    <group position={position} rotation={rotation}>
      {gestureMode === GestureMode.Build && (
        <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
          <meshToonMaterial color={0x4ecdc4} opacity={0.2} transparent={true} />
        </Box>
      )}

      <Line
        points={[
          [-width / 2, 0.1, -depth / 2],
          [width / 2, 0.1, -depth / 2],
          [width / 2, 0.1, depth / 2],
          [-width / 2, 0.1, depth / 2],
          [-width / 2, 0.1, -depth / 2],
        ]}
        position={[0, 0.5, 0]}
        color={0x4ecdc4}
        dashed={true}
        dashScale={1}
        dashOffset={dashOffset}
        lineWidth={2}
      />

      {children}
    </group>
  );
}

interface Props extends PropsWithChildren {
  position: Vector3;
  rotation: Euler;
}
