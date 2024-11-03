import { Canvas } from "@react-three/fiber";
import { PropsWithChildren } from "react";

export function PreviewScene({ children }: PropsWithChildren) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 40],
        fov: 60,
        near: 1,
        far: 10000,
      }}
    >
      <ambientLight color={0xdc8874} intensity={2} />

      <hemisphereLight color={0xaaaaaa} groundColor={0x000000} intensity={4} />

      <directionalLight
        color={0xffffff}
        position={[150, 350, 350]}
        castShadow
        intensity={5}
      />

      {children}
    </Canvas>
  );
}
