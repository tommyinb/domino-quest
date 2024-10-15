import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { PropsWithChildren, useContext } from "react";
import { Lighting } from "./Lighting";
import "./Scene.css";
import { SceneContext } from "./SceneContext";
import { Sky } from "./Sky";

export function Scene({ children }: PropsWithChildren) {
  const { debug, clickHandles, orbitControlDisables } =
    useContext(SceneContext);

  return (
    <Canvas
      className="scenes-Scene"
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

      <Physics debug={debug} gravity={[0, -400, 0]}>
        {children}
      </Physics>

      <OrbitControls enabled={orbitControlDisables.length <= 0} />
    </Canvas>
  );
}
