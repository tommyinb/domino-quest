import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, useContext, useState } from "react";
import { Lighting } from "./Lighting";
import "./Scene.css";
import { SceneContext } from "./SceneContext";

export function Scene({ children }: PropsWithChildren) {
  const { debug, clickHandles } = useContext(SceneContext);

  const [clicking, setClicking] = useState<{
    pointerId: number;
    clientX: number;
    clientY: number;
  }>();

  return (
    <Canvas
      className="scenes-Scene"
      camera={{
        position: [-75, 125, 200],
        fov: 60,
        near: 1,
        far: 10000,
      }}
      onPointerDown={(event) => {
        (event.target as HTMLDivElement).setPointerCapture(event.pointerId);

        setClicking({
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
        });
      }}
      onPointerMove={(event) => {
        if (clicking) {
          if (clicking.pointerId === event.pointerId) {
            if (
              Math.abs(event.clientX - clicking.clientX) > 20 ||
              Math.abs(event.clientY - clicking.clientY) > 20
            ) {
              setClicking(undefined);
            }
          } else {
            setClicking(undefined);
          }
        }
      }}
      onPointerUp={(event) => {
        if (
          clicking?.pointerId === event.pointerId &&
          Math.abs(event.clientX - clicking.clientX) <= 20 &&
          Math.abs(event.clientY - clicking.clientY) <= 20
        ) {
          for (const handle of clickHandles) {
            handle(event);
          }
        }

        setClicking(undefined);
      }}
      onPointerCancel={() => setClicking(undefined)}
    >
      <fog attach="fog" args={[0xf7d9aa, 100, 950]} />

      {debug && <axesHelper args={[10]} />}

      <Lighting debug={debug} />

      {debug && <Stats />}

      {children}
    </Canvas>
  );
}
