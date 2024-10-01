import { OrbitControls, Stats } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { PropsWithChildren } from "react";
import { Lighting } from "./Lighting";
import { Sky } from "./Sky";

export function Scene({ children }: PropsWithChildren) {
  const { debug } = useControls({
    debug: false,
  });

  return (
    <Physics debug={debug} gravity={[0, -400, 0]}>
      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />

      {debug && <axesHelper args={[10]} />}

      <Lighting debug={debug} />

      <Sky />

      {debug && <Stats />}

      {children}

      <OrbitControls />
    </Physics>
  );
}
