import { Box } from "@react-three/drei";
import { MeshToonMaterial } from "three";

export function Build() {
  const material = new MeshToonMaterial();
  material.color.set(0x4ecdc4);

  return (
    <group>
      <Box args={[3, 6, 1]} position={[0, 3, 0]} material={material} />
    </group>
  );
}
