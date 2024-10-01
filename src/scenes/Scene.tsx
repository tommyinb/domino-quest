import { OrbitControls, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { PropsWithChildren, useRef } from "react";
import { DirectionalLight, HemisphereLight } from "three";
import { Sky } from "./Sky";

export function Scene({ children }: PropsWithChildren) {
  const { debug } = useControls({
    debug: false,
  });

  const hemisphereLight = useRef<HemisphereLight>(null!);
  const directionalLight = useRef<DirectionalLight>(null!);

  return (
    <Physics debug={debug} gravity={[0, -400, 0]}>
      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />

      {debug && <axesHelper args={[10]} />}

      <hemisphereLight
        ref={hemisphereLight}
        color={0xaaaaaa}
        groundColor={0x000000}
        intensity={0.9}
      />
      {debug && <hemisphereLightHelper args={[hemisphereLight.current, 1]} />}

      <directionalLight
        ref={directionalLight}
        color={0xffffff}
        position={[-150, 350, 350]}
        castShadow={true}
        intensity={5}
      />
      {debug && <directionalLightHelper args={[directionalLight.current, 1]} />}

      <Sky />

      {debug && <Stats />}

      {children}

      <OrbitControls />
    </Physics>
  );
}
