import { Line } from "@react-three/drei";
import { useMemo } from "react";
import { Vector3 } from "three";
import { useBuilt } from "../../blocks/useBuilt";

export function PathLine({ points: points, progress }: Props) {
  const passes = useMemo(() => points.slice(0, progress), [points, progress]);

  const built = useBuilt();

  return (
    <>
      <Line
        points={points}
        position={[0, 0.5, 0]}
        color={0xf7fff7}
        dashed={true}
        dashScale={0.15}
        lineWidth={4}
      />

      {passes.length > 1 && (
        <Line
          points={passes}
          position={[0, 0.6, 0]}
          color={built ? 0xef7a85 : 0xffe66d}
          dashed={true}
          dashScale={0.15}
          lineWidth={4}
        />
      )}
    </>
  );
}

interface Props {
  points: Vector3[];
  progress: number;
}
