import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject, useContext, useEffect, useState } from "react";
import { Quaternion, Vector3 as ThreeVector3 } from "three";
import { PlayContext } from "../stages/PlayContext";

export function useTipping(ref: RefObject<RapierRigidBody>, index: number) {
  const [tipping, setTipping] = useState(false);

  useFrame(() => {
    if (ref.current) {
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
      setTipping(dot < 0.7);
    }
  });

  const { setTippeds } = useContext(PlayContext);
  useEffect(() => {
    if (tipping) {
      setTippeds((oldTippings) => {
        if (oldTippings[index]) {
          return oldTippings;
        } else {
          const newTippings = [...oldTippings];
          newTippings[index] = true;
          return newTippings;
        }
      });
    }
  }, [index, setTippeds, tipping]);

  return tipping;
}
