import { Cylinder } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { useButtonMaterial } from "./useButtonMaterial";

export function GroundButton({ position, size }: Props) {
  const buttonMaterial = useButtonMaterial();

  return (
    <group position={position}>
      <Cylinder
        args={[size, size, 0.4, 32]}
        position={[0, 0.2, 0]}
        material={buttonMaterial}
      />
    </group>
  );
}

interface Props {
  position: Vector3;
  size: number;
}
