import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, useContext } from "react";
import { cameraX, cameraY, cameraZ } from "../controllers/CameraControl";
import { Lighting } from "./Lighting";
import "./Scene.css";
import { SceneContext } from "./SceneContext";

export function Scene({ children }: PropsWithChildren) {
  const { debug, clickHandles } = useContext(SceneContext);

  return (
    <Canvas
      className="scenes-Scene"
      camera={{
        position: [cameraX, cameraY, cameraZ],
        fov: 60,
        near: 1,
        far: 10000,
      }}
      onClick={(event) => {
        for (const handle of clickHandles) {
          handle(event);
        }
      }}
    >
      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />

      {debug && <axesHelper args={[10]} />}

      <Lighting debug={debug} />

      {debug && <Stats />}

      {children}
    </Canvas>
  );
}
