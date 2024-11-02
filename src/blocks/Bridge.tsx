import { Vector3 as FiberVector3 } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Euler } from "three";
import { BridgeContent } from "./BridgeContent";

export function Bridge({ position, rotation, length }: Props) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody>
        <BridgeContent length={length} />
      </RigidBody>
    </group>
  );
}

interface Props {
  position: FiberVector3;
  rotation: Euler;
  length: number;
}
