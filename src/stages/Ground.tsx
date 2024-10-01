import { Box, Cylinder } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { MeshPhongMaterial } from "three";

export function Ground() {
  const groundMaterial = new MeshPhongMaterial();
  groundMaterial.color.set(0xf7fff7);
  groundMaterial.flatShading = true;

  const buttonMaterial = new MeshPhongMaterial();
  buttonMaterial.color.set(0xffe66d);
  buttonMaterial.flatShading = true;

  return (
    <group>
      <RigidBody type="fixed">
        <Box
          args={[40, 5, 200]}
          position={[0, -2.5, 0]}
          material={groundMaterial}
        />
      </RigidBody>

      <RigidBody position={[0, -2.5, 100]} type="fixed" colliders={false}>
        <Cylinder args={[40, 40, 5, 32]} material={groundMaterial} />

        <CylinderCollider args={[2.5, 40]} />
      </RigidBody>

      <Cylinder
        args={[20, 20, 0.4, 32]}
        position={[0, 0.2, 100]}
        material={buttonMaterial}
      />

      <RigidBody position={[0, -2.5, -100]} type="fixed" colliders={false}>
        <Cylinder args={[40, 40, 5, 32]} material={groundMaterial} />

        <CylinderCollider args={[2.5, 40]} />
      </RigidBody>

      <Cylinder
        args={[20, 20, 0.4, 32]}
        position={[0, 0.2, -100]}
        material={buttonMaterial}
      />
    </group>
  );
}
