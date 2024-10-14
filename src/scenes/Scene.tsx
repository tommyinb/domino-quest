import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, useContext } from "react";
import { Lighting } from "./Lighting";
import { SceneContext } from "./SceneContext";
import { Sky } from "./Sky";

export function Scene({ children }: PropsWithChildren) {
  const { debug, clickHandles, orbitControlDisables } =
    useContext(SceneContext);

  return (
    <Canvas
      camera={{ position: [-75, 125, 200], fov: 60, near: 1, far: 10000 }}
      onClick={(event) => {
        for (const handle of clickHandles) {
          handle(event);
        }
      }}
    >
      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />

      {debug && <axesHelper args={[10]} />}

      <Lighting debug={debug} />

      <Sky />

      {debug && <Stats />}

      {children}

      <OrbitControls enabled={orbitControlDisables.length <= 0} />
    </Canvas>
  );
}
