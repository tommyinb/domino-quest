import { Vector3 } from "@react-three/fiber";
import { GroundButton } from "./GroundButton";
import { GroundDisk } from "./GroundDisk";

export function GroundStation({ position, diskSize, buttonSize }: Props) {
  return (
    <group position={position}>
      <GroundDisk position={[0, 0, 0]} size={diskSize} />

      <GroundButton position={[0, 0, 0]} size={buttonSize} />
    </group>
  );
}

interface Props {
  position: Vector3;
  diskSize: number;
  buttonSize: number;
}
