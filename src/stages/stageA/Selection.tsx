import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { ColorRepresentation, Vector3Tuple } from "three";

export function Selection({ width, depth, position, color }: Props) {
  const [dashOffset, setDashOffset] = useState(0);
  useFrame(({ clock }) => setDashOffset(clock.getElapsedTime()));

  return (
    <Line
      points={[
        [-width / 2, 0.1, -depth / 2],
        [width / 2, 0.1, -depth / 2],
        [width / 2, 0.1, depth / 2],
        [-width / 2, 0.1, depth / 2],
        [-width / 2, 0.1, -depth / 2],
      ]}
      position={position}
      color={color}
      dashed={true}
      dashScale={1}
      dashOffset={dashOffset}
      lineWidth={2}
    />
  );
}

interface Props {
  width: number;
  depth: number;
  position: Vector3Tuple;
  color: ColorRepresentation;
}
