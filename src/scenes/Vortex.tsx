import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Euler, Group } from "three";
import { Cloud } from "./Cloud";

export function Vortex({ positionZ, speed }: Props) {
  const clouds = useMemo(() => {
    const count = 20;
    const stepAngle = (Math.PI * 2) / count;

    return Array.from({ length: count }, (_, i) => {
      const angle = stepAngle * i;
      const height = 300 + Math.random() * 200;

      return {
        positionX: Math.cos(angle) * height,
        positionY: Math.sin(angle) * height,
        positionZ: -200 - Math.random() * 400,
        rotationZ: angle + Math.PI / 2,
        size: 1 + Math.random() * 2,
      };
    });
  }, []);

  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    ref.current?.setRotationFromEuler(
      new Euler(0, 0, speed * clock.getElapsedTime())
    );
  });

  return (
    <group ref={ref} position={[0, 0, positionZ]}>
      {clouds.map((cloud, i) => (
        <Cloud key={i} {...cloud} />
      ))}
    </group>
  );
}

interface Props {
  positionZ: number;
  speed: number;
}
