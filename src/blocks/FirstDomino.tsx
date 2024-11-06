import { Box } from "@react-three/drei";
import { Vector3 as FiberVector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useRef } from "react";
import { Euler, Vector3 as ThreeVector3 } from "three";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { useSetSlotState } from "../controllers/useSetSlotState";
import { FirstDominoHint } from "./FirstDominoHint";
import { depth, height, width } from "./FollowDomino";
import { useBuilt } from "./useBuilt";
import { useTipped } from "./useTipped";

export function FirstDomino({ position, rotation, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  useTipped(ref, index);

  const { item } = useContext(SlotContext);
  const setSlotState = useSetSlotState();

  const built = useBuilt();

  useEffect(() => {
    if (item.state === ItemState.Playing) {
      const impulse = new ThreeVector3(0, 0, 100000).applyEuler(rotation);
      ref.current?.applyImpulse(impulse, true);
    }
  }, [item.state, rotation]);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody position={[0, 0.1, 0]} ref={ref}>
        <Box
          args={[width, height, depth]}
          position={[0, height / 2, 0]}
          onClick={() => {
            if (built) {
              setSlotState(ItemState.Playing);
            }
          }}
        >
          <meshPhongMaterial color={0x3ebdb4} flatShading={true} />
        </Box>
      </RigidBody>

      <FirstDominoHint />
    </group>
  );
}

interface Props {
  position: FiberVector3;
  rotation: Euler;

  index: number;
}
