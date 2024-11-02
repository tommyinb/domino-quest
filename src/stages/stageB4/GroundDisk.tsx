import { Cylinder } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";
import { useGroundMaterial } from "../stageA/useGroundMaterial";

export function GroundDisk({ position, size }: Props) {
  const groundMaterial = useGroundMaterial();

  return (
    <group position={position}>
      <Cylinder
        args={[size, size, 5, 32]}
        position={[0, -2.5, 0]}
        material={groundMaterial}
      />

      {Array.from({ length: 10 }).map((_, index) => (
        <CuboidCollider
          key={index}
          args={[size / 5, 2.5, size]}
          position={[0, -2.5, 0]}
          rotation={[0, (index * Math.PI) / 10, 0]}
        />
      ))}
    </group>
  );
}

interface Props {
  position: Vector3;
  size: number;
}
