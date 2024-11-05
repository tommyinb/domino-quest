import { Vector3 } from "@react-three/fiber";
import { GroundButton } from "./GroundButton";
import { GroundDisk } from "./GroundDisk";

export function GroundStation({ position }: Props) {
  return (
    <group position={position}>
      <GroundDisk position={[0, 0, 0]} size={40} />

      <GroundButton position={[0, 0, 0]} />
    </group>
  );
}

interface Props {
  position: Vector3;
}
