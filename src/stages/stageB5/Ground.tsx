import { useTexture } from "@react-three/drei";
import { GroundButton } from "../stageA/GroundButton";
import bearFace from "./bearFace.png";
import { GroundBox } from "./GroundBox";

useTexture.preload(bearFace);

export function Ground() {
  const bearTexture = useTexture(bearFace);

  return (
    <>
      <GroundBox width={400} height={400} />

      <mesh position={[0, 1, 30]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 120]} />
        <meshBasicMaterial map={bearTexture} opacity={0.8} transparent />
      </mesh>

      <GroundButton position={[0, 0, 180]} size={20} />
    </>
  );
}
