import { Box, Cylinder } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { MeshToonMaterial } from "three";

export function Ground() {
  const groundMaterial = new MeshToonMaterial();
  groundMaterial.color.set(0xf7fff7);

  const buttonMaterial = new MeshToonMaterial();
  buttonMaterial.color.set(0xffe66d);

  return (
    <group>
      <RigidBody type="fixed" friction={2}>
        <Box
          args={[4, 0.5, 20]}
          position={[0, -0.25, 0]}
          material={groundMaterial}
        />
      </RigidBody>

      <RigidBody
        position={[0, -0.25, 10]}
        type="fixed"
        friction={2}
        colliders={false}
      >
        <Cylinder args={[4, 4, 0.5, 32]} material={groundMaterial} />

        <CylinderCollider args={[0.25, 4]} />
      </RigidBody>

      <Cylinder
        args={[2, 2, 0.04, 32]}
        position={[0, 0.02, 10]}
        material={buttonMaterial}
      />

      <RigidBody
        position={[0, -0.25, -10]}
        type="fixed"
        friction={2}
        colliders={false}
      >
        <Cylinder args={[4, 4, 0.5, 32]} material={groundMaterial} />

        <CylinderCollider args={[0.25, 4]} />
      </RigidBody>

      <Cylinder
        args={[2, 2, 0.04, 32]}
        position={[0, 0.02, -10]}
        material={buttonMaterial}
      />
    </group>
  );
}
