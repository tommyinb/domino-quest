import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useContext, useEffect, useRef } from "react";
import { ItemState } from "../controllers/itemState";
import { SlotContext } from "../controllers/SlotContext";
import { useSetSlotState } from "../controllers/useSetSlotState";
import { depth, height, width } from "./MiddleDomino";
import { useTipping } from "./useTipping";

export function LastDomino({ position, index }: Props) {
  const ref = useRef<RapierRigidBody>(null);
  const tipping = useTipping(ref, index);

  const { item } = useContext(SlotContext);
  const setSlotState = useSetSlotState();
  useEffect(() => {
    if (item.state === ItemState.Playing) {
      if (tipping) {
        setSlotState(ItemState.Success);
      }
    }
  }, [item.state, setSlotState, tipping]);

  return (
    <RigidBody ref={ref} position={position}>
      <Box args={[width, height, depth]} position={[0, height / 2, 0]}>
        <meshPhongMaterial color={0x5eddd4} flatShading={true} />
      </Box>
    </RigidBody>
  );
}

interface Props {
  position: Vector3;
  index: number;
}
