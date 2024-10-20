import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useRef } from "react";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { useSetSlotState } from "../controllers/useSetSlotState";
import { Hint } from "./Hint";
import { depth, height, width } from "./MiddleDomino";
import { useTipping } from "./useTipping";

export function FirstDomino({ position, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  const tipping = useTipping(ref, index);

  const { item } = useContext(SlotContext);
  const setSlotState = useSetSlotState();

  return (
    <group position={position}>
      <RigidBody ref={ref}>
        <Box
          args={[width, height, depth]}
          position={[0, height / 2, 0]}
          onClick={() => {
            if (item.state === ItemState.Built) {
              if (!tipping) {
                ref.current?.applyImpulse({ x: 0, y: 0, z: -100000 }, true);
              }

              setSlotState(ItemState.Playing);
            }
          }}
        >
          <meshPhongMaterial
            color={tipping ? 0x5eddd4 : 0x6eede4}
            flatShading={true}
          />
        </Box>
      </RigidBody>

      {item.state === ItemState.Built && (
        <Hint position={[0, height, 0]}>Now, give it a push!</Hint>
      )}
    </group>
  );
}

interface Props {
  position: Vector3;
  index: number;
}
