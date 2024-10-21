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
import { useTipping } from "./useTipping";

export function FirstDomino({ position, rotation, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  useTipping(ref, index);

  const { item } = useContext(SlotContext);
  const setSlotState = useSetSlotState();

  return (
    <group position={position} rotation={rotation}>
      <RigidBody position={[0, 1, 0]} ref={ref}>
        <Box
          args={[width, height, depth]}
          position={[0, height / 2, 0]}
          onClick={() => {
            if (item.state === ItemState.Built) {
              ref.current?.applyImpulse({ x: 0, y: 0, z: -100000 }, true);

              setSlotState(ItemState.Playing);
            }
          }}
        >
          <meshPhongMaterial color={0x3ebdb4} flatShading={true} />
        </Box>
      </RigidBody>

      {item.level <= 2 && item.state === ItemState.Built && (
        <Hint position={[0, height, 0]}>Now, give it a push!</Hint>
      )}
    </group>
  );
}

interface Props {
  position: Vector3;
  rotation: Euler;

  index: number;
}
