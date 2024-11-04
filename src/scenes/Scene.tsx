import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, useContext } from "react";
import { useCurrentItem } from "../controllers/useCurrentItem";
import { Lighting } from "./Lighting";
import "./Scene.css";
import { SceneContext } from "./SceneContext";

export function Scene({ children }: PropsWithChildren) {
  const {
    debug,
    pointerDownHandlers,
    pointerMoveHandlers,
    pointerUpHandlers,
    pointerCancelHandlers,
  } = useContext(SceneContext);

  const item = useCurrentItem();

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

        for (const pointerDownHandler of pointerDownHandlers) {
          pointerDownHandler(event);
        }
      }}
      onPointerMove={(event) => {
        for (const pointerMoveHandler of pointerMoveHandlers) {
          pointerMoveHandler(event);
        }
      }}
      onPointerUp={(event) => {
        for (const pointerUpHandler of pointerUpHandlers) {
          pointerUpHandler(event);
        }
      }}
      onPointerCancel={(event) => {
        for (const pointerCancelHandler of pointerCancelHandlers) {
          pointerCancelHandler(event);
        }
      }}
    >
      <fog
        attach="fog"
        args={[0xf7d9aa, 200, (item?.start.stageHeight ?? 600) * 2]}
      />

      {debug && <axesHelper args={[10]} />}

      <Lighting debug={debug} />

      {debug && <Stats />}

      {children}
    </Canvas>
  );
}
