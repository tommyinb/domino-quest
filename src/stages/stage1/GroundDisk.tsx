import { Cylinder } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useGroundMaterial } from "./useGroundMaterial";

export function GroundDisk({ position, size }: Props) {
  const groundMaterial = useGroundMaterial();

  return (
    <RigidBody position={position} type="fixed" colliders={false}>
      <Cylinder
        args={[size, size, 5, 32]}
        position={[0, -2.5, 0]}
        material={groundMaterial}
      />

      <CylinderCollider args={[2.5, size]} position={[0, -2.5, 0]} />
    </RigidBody>
  );
}

interface Props {
  position: Vector3;
  size: number;
}
