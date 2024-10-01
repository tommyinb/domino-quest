import { useRef } from "react";
import { DirectionalLight, HemisphereLight } from "three";

export function Lighting({ debug }: Props) {
  const hemisphereLight = useRef<HemisphereLight>(null!);
  const directionalLight = useRef<DirectionalLight>(null!);

  return (
    <>
      <ambientLight color={0xdc8874} intensity={1} />

      <hemisphereLight
        ref={hemisphereLight}
        color={0xaaaaaa}
        groundColor={0x000000}
        intensity={2}
      />
      {debug && <hemisphereLightHelper args={[hemisphereLight.current, 1]} />}

      <directionalLight
        ref={directionalLight}
        color={0xffffff}
        position={[-150, 350, 350]}
        castShadow={true}
        intensity={3}
      />
      {debug && <directionalLightHelper args={[directionalLight.current, 1]} />}
    </>
  );
}

interface Props {
  debug: boolean;
}
