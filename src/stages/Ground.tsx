import { Box, Cylinder } from "@react-three/drei";
import { MeshToonMaterial } from "three";

export function Ground() {
  const groundMaterial = new MeshToonMaterial();
  groundMaterial.color.set(0xf7fff7);

  const buttonMaterial = new MeshToonMaterial();
  buttonMaterial.color.set(0xffe66d);

  return (
    <group>
      <Box
        args={[8, 0.5, 40]}
        position={[0, -0.25, 0]}
        material={groundMaterial}
      />

      <Cylinder
        args={[8, 8, 0.5, 32]}
        position={[0, -0.25, 20]}
        material={groundMaterial}
      />

      <Cylinder
        args={[4, 4, 0.04, 32]}
        position={[0, 0.02, 20]}
        material={buttonMaterial}
      />

      <Cylinder
        args={[8, 8, 0.5, 32]}
        position={[0, -0.25, -20]}
        material={groundMaterial}
      />

      <Cylinder
        args={[4, 4, 0.04, 32]}
        position={[0, 0.02, -20]}
        material={buttonMaterial}
      />
    </group>
  );
}
