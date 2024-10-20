import { Cylinder } from "@react-three/drei";
import { useFrame, Vector3 } from "@react-three/fiber";
import { useContext, useMemo } from "react";
import { Color, MeshPhongMaterial } from "three";
import { SlotContext } from "../../controllers/SlotContext";
import { ItemState } from "../../controllers/itemState";
import { GroundDisk } from "./GroundDisk";

export function GroundStation({ position }: Props) {
  const buttonMaterial = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xffe66d);
    material.flatShading = true;
    return material;
  }, []);

  const { item } = useContext(SlotContext);
  const buttonColor = useMemo(
    () => new Color(item.state === ItemState.Building ? 0xffe66d : 0xef7a85),
    [item.state]
  );
  useFrame(() => buttonMaterial.color.lerp(buttonColor, 0.1));

  return (
    <group position={position}>
      <GroundDisk position={[0, 0, 0]} size={40} />

      <Cylinder
        args={[20, 20, 0.4, 32]}
        position={[0, 0.2, 0]}
        material={buttonMaterial}
      />
    </group>
  );
}

interface Props {
  position: Vector3;
}
