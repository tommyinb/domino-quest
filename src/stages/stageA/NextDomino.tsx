import { Box } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { PropsWithChildren, useContext } from "react";
import { depth, height, width } from "../../blocks/FollowDomino";
import { ControllerContext } from "../../controllers/ControllerContext";
import { GestureMode } from "../../controllers/gestureMode";
import { Selection } from "./Selection";

export function NextDomino({ position, rotation, children }: Props) {
  const { gestureMode } = useContext(ControllerContext);

  return (
    <group position={position} rotation={rotation}>
      {gestureMode === GestureMode.Build && (
        <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
          <meshToonMaterial color={0x4ecdc4} opacity={0.2} transparent={true} />
        </Box>
      )}

      <Selection
        width={width}
        depth={depth}
        position={[0, 0.5, 0]}
        color={0x4ecdc4}
      />

      {children}
    </group>
  );
}

interface Props extends PropsWithChildren {
  position: Vector3;
  rotation: Euler;
}
