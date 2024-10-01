import {
  Cloud,
  Clouds,
  Environment,
  OrbitControls,
  Sky,
  Stats,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { PropsWithChildren, useRef } from "react";
import {
  DirectionalLight,
  HemisphereLight,
  MeshBasicMaterial,
  SpotLight,
} from "three";
import "./App.css";

export function Scene({ children }: PropsWithChildren) {
  const { debug } = useControls({
    debug: false,
  });

  const hemisphereLight = useRef<HemisphereLight>(null!);
  const directionalLight = useRef<DirectionalLight>(null!);
  const spotLight = useRef<SpotLight>(null!);

  return (
    <Physics debug={debug}>
      {debug && <axesHelper args={[10]} />}

      <hemisphereLight ref={hemisphereLight} intensity={0.7} />
      {debug && <hemisphereLightHelper args={[hemisphereLight.current, 1]} />}

      <spotLight
        ref={spotLight}
        decay={0}
        angle={1}
        penumbra={1}
        position={[20, 30, 2.5]}
        castShadow
        shadow-bias={-0.00001}
      />
      {debug && <spotLightHelper args={[spotLight.current]} />}

      <directionalLight
        ref={directionalLight}
        position={[-10, 10, 20]}
        intensity={1.5}
      />
      {debug && <directionalLightHelper args={[directionalLight.current, 1]} />}

      <Sky />
      <Clouds material={MeshBasicMaterial}>
        <Cloud seed={10} bounds={50} volume={80} position={[40, 0, -80]} />
        <Cloud seed={10} bounds={50} volume={80} position={[-40, 10, -80]} />
      </Clouds>

      <Environment preset="city" />

      {debug && <Stats />}

      {children}

      {debug && <OrbitControls />}
    </Physics>
  );
}
