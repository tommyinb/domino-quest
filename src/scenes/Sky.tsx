import { Vortex } from "./Vortex";

export function Sky() {
  return (
    <group>
      <Vortex positionZ={-50} speed={1} />
      <Vortex positionZ={-100} speed={-1} />
    </group>
  );
}
