import { useContext, useRef } from "react";
import { DirectionalLight, HemisphereLight } from "three";
import { SettingContext } from "../settings/SettingContext";

export function Lighting() {
  const hemisphereLight = useRef<HemisphereLight>(null!);
  const directionalLight = useRef<DirectionalLight>(null!);

  const { debug } = useContext(SettingContext);

  return (
    <>
      <ambientLight color={0xdc8874} intensity={2} />

      <hemisphereLight
        ref={hemisphereLight}
        color={0xaaaaaa}
        groundColor={0x000000}
        intensity={4}
      />
      {debug && <hemisphereLightHelper args={[hemisphereLight.current, 1]} />}

      <directionalLight
        ref={directionalLight}
        color={0xffffff}
        position={[-150, 350, 350]}
        castShadow
        intensity={5}
      />
      {debug && <directionalLightHelper args={[directionalLight.current, 1]} />}
    </>
  );
}
