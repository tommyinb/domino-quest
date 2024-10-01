import { Vortex } from "./Vortex";

export function Sky() {
  return (
    <group>
      <Vortex positionZ={300} speed={0.2} />
      <Vortex positionZ={100} speed={-0.1} />
      <Vortex positionZ={-100} speed={0.1} />
      <Vortex positionZ={-300} speed={-0.2} />
    </group>
  );
}
