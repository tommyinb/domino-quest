import { animated, useSpring } from "@react-spring/three";
import { Box } from "@react-three/drei";
import { CuboidCollider } from "@react-three/rapier";
import { useGroundMaterial } from "../stageA/useGroundMaterial";

export function GroundBox({ width, depth, x, z }: Props) {
  const groundMaterial = useGroundMaterial();

  const [{ y }] = useSpring(
    () => ({
      from: { y: -20 },
      to: { y: 0 },
      config: { duration: 100 },
    }),
    []
  );

  return (
    <group position={[x, -2.5, z]}>
      <animated.group position-y={y}>
        <Box args={[width, 5, depth]} material={groundMaterial} />
      </animated.group>

      <CuboidCollider args={[width / 2, 2.5, depth / 2]} position={[0, 0, 0]} />
    </group>
  );
}

interface Props {
  width: number;
  depth: number;

  x: number;
  z: number;
}
