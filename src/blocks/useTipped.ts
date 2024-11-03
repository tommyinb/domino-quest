import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject, useContext, useEffect, useState } from "react";
import { Quaternion, Vector3 as ThreeVector3 } from "three";
import { PlayContext } from "../stages/PlayContext";

export function useTipped(ref: RefObject<RapierRigidBody>, index: number) {
  const [tipped, setTipped] = useState(false);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    if (tipped) {
      return;
    }

    const worldUp = new ThreeVector3(0, 1, 0);

    const rotation = ref.current.rotation();
    const quaternion = new Quaternion(
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );

    const dominoUp = worldUp.clone().applyQuaternion(quaternion);

    const dot = dominoUp.dot(worldUp);
    if (dot >= 0.9) {
      return;
    }

    setTipped(true);
  });

  const { setTippeds } = useContext(PlayContext);
  useEffect(() => {
    if (tipped) {
      setTippeds((oldTippeds) => {
        if (oldTippeds[index]) {
          return oldTippeds;
        } else {
          const newTippeds = [...oldTippeds];
          newTippeds[index] = tipped;
          return newTippeds;
        }
      });
    }
  }, [index, setTippeds, tipped]);

  return tipped;
}
