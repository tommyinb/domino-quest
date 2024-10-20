import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useRef } from "react";
import { Euler } from "three";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { useSetSlotState } from "../controllers/useSetSlotState";
import { depth, height, width } from "./FollowDomino";
import { Hint } from "./Hint";
import { useBuilt } from "./useBuilt";
import { useTipping } from "./useTipping";

export function FirstDomino({ position, rotation, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  useTipping(ref, index);

  const { item } = useContext(SlotContext);
  const setSlotState = useSetSlotState();

  const built = useBuilt();

  return (
    <group position={position} rotation={rotation}>
      <RigidBody position={[0, 1, 0]} ref={ref}>
        <Box
          args={[width, height, depth]}
          position={[0, height / 2, 0]}
          onClick={() => {
            if (built) {
              ref.current?.applyImpulse({ x: 0, y: 0, z: -100000 }, true);

              setSlotState(ItemState.Playing);
            }
          }}
        >
          <meshPhongMaterial color={0x3ebdb4} flatShading={true} />
        </Box>
      </RigidBody>

      {item.level <= 1 && item.state === ItemState.Building && built && (
        <Hint position={[0, height, 0]}>Now, give it a push!</Hint>
      )}

      {item.level > 1 &&
        item.level < 5 &&
        item.round <= 0 &&
        item.state === ItemState.Building &&
        built && <Hint position={[0, height, 0]}>Push!</Hint>}
    </group>
  );
}

interface Props {
  position: Vector3;
  rotation: Euler;

  index: number;
}
