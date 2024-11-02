import { Cylinder } from "@react-three/drei";
import { CuboidCollider } from "@react-three/rapier";
import { GroundButton } from "../stage1/GroundButton";
import { useGroundMaterial } from "../stage1/useGroundMaterial";
import { endPosition, startPosition } from "./start";

export function Ground() {
  const size = endPosition[2] + buttonSize + 30;

  const groundMaterial = useGroundMaterial();

  return (
    <>
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

      <GroundButton position={startPosition} size={buttonSize} />

      <GroundButton position={endPosition} size={buttonSize} />
    </>
  );
}

export const buttonSize = 20;
