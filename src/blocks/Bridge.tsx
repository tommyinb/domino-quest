import { Vector3 as FiberVector3 } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Euler } from "three";
import { BridgeCollider } from "./BridgeCollider";
import { BridgeModel } from "./BridgeModel";

export function Bridge({ position, rotation, length }: Props) {
  return (
    <group position={position} rotation={rotation}>
      <RigidBody position={[0, 0, 0]} colliders={false}>
        <BridgeModel length={length} opacity={0.8} />

        <BridgeCollider length={length} />
      </RigidBody>
    </group>
  );
}

interface Props {
  position: FiberVector3;
  rotation: Euler;
  length: number;
}
