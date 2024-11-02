import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Vector3 as ThreeVector3, Vector3Tuple } from "three";
import { useGroundMaterial } from "./useGroundMaterial";

export function GroundBridge({ fromPosition, toPosition }: Props) {
  const groundMaterial = useGroundMaterial();

  const fromVector = new ThreeVector3(...fromPosition);
  const toVector = new ThreeVector3(...toPosition);

  const distance = fromVector.distanceTo(toVector);

  const middlePosition = fromVector.lerp(toVector, 0.5);

  const angle = Math.atan2(
    toVector.x - middlePosition.x,
    toVector.z - middlePosition.z
  );

  return (
    <RigidBody position={middlePosition} rotation={[0, angle, 0]} type="fixed">
      <Box
        args={[40, 5, distance]}
        position={[0, -2.5, 0]}
        material={groundMaterial}
      />
    </RigidBody>
  );
}

interface Props {
  fromPosition: Vector3Tuple;
  toPosition: Vector3Tuple;
}
