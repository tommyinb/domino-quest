import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useGroundMaterial } from "../stageA/useGroundMaterial";

export function GroundBox({ width, height }: Props) {
  const groundMaterial = useGroundMaterial();

  return (
    <RigidBody type="fixed">
      <Box
        args={[width, 5, height]}
        position={[0, -2.5, 0]}
        material={groundMaterial}
      />
    </RigidBody>
  );
}

interface Props {
  width: number;
  height: number;
}
