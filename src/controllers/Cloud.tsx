import { Box } from "@react-three/drei";
import { useMemo } from "react";
import { MeshPhongMaterial } from "three";

export function Cloud({
  positionX,
  positionY,
  positionZ,
  rotationZ,
  size,
}: Props) {
  const boxes = useMemo(() => {
    const count = 2 + Math.floor(Math.random() * 3);

    return Array.from({ length: count }, (_, i) => ({
      size: 20 * (0.1 + Math.random() * 0.9),
      positionX: i * 15,
      positionY: Math.random() * 10,
      positionZ: Math.random() * 10,
      rotationY: Math.random() * Math.PI * 2,
      rotationZ: Math.random() * Math.PI * 2,
    }));
  }, []);

  const material = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xd8d0d1);
    material.flatShading = true;
    material.opacity = 0.6;
    material.transparent = true;
    return material;
  }, []);

  return (
    <group
      position={[positionX, positionY, positionZ]}
      rotation={[0, 0, rotationZ]}
      scale={[size, size, size]}
    >
      {boxes.map((box, i) => (
        <Box
          key={i}
          args={[box.size, box.size, box.size]}
          position={[box.positionX, box.positionY, box.positionZ]}
          rotation={[0, box.rotationY, box.rotationZ]}
          material={material}
        />
      ))}
    </group>
  );
}

interface Props {
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationZ: number;
  size: number;
}
