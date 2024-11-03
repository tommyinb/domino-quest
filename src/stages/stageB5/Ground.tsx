import { Box, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { GroundButton } from "../stageA/GroundButton";
import { useGroundMaterial } from "../stageA/useGroundMaterial";
import bearFace from "./bearFace.png";

useTexture.preload(bearFace);

export function Ground() {
  const groundMaterial = useGroundMaterial();

  const bearTexture = useTexture(bearFace);

  return (
    <>
      <RigidBody type="fixed">
        <Box
          args={[400, 5, 400]}
          position={[0, -2.5, 0]}
          material={groundMaterial}
        />
      </RigidBody>

      <mesh position={[0, 1, 30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 120]} />
        <meshBasicMaterial map={bearTexture} opacity={0.8} transparent />
      </mesh>

      <GroundButton position={[0, 0, 180]} size={20} />
    </>
  );
}
