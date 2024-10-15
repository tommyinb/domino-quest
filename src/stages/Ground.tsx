import { Box, Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useContext, useMemo } from "react";
import { Color, MeshPhongMaterial } from "three";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Ground() {
  const groundMaterial = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xf7fff7);
    material.flatShading = true;
    return material;
  }, []);

  const buttonMaterial = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xffe66d);
    material.flatShading = true;
    return material;
  }, []);

  const { state } = useContext(StageContext);
  const buttonColor = useMemo(
    () => new Color(state === StageState.Building ? 0xffe66d : 0xef7a85),
    [state]
  );
  useFrame(() => buttonMaterial.color.lerp(buttonColor, 0.1));

  return (
    <group>
      <RigidBody type="fixed">
        <Box
          args={[40, 5, 150]}
          position={[0, -2.5, 0]}
          material={groundMaterial}
        />
      </RigidBody>

      <RigidBody position={[0, -2.5, 75]} type="fixed" colliders={false}>
        <Cylinder args={[40, 40, 5, 32]} material={groundMaterial} />

        <CylinderCollider args={[2.5, 40]} />
      </RigidBody>

      <Cylinder
        args={[20, 20, 0.4, 32]}
        position={[0, 0.2, 75]}
        material={buttonMaterial}
      />

      <RigidBody position={[0, -2.5, -75]} type="fixed" colliders={false}>
        <Cylinder args={[40, 40, 5, 32]} material={groundMaterial} />

        <CylinderCollider args={[2.5, 40]} />
      </RigidBody>

      <group position={[0, 0, -75]}>
        <Cylinder
          args={[20, 20, 0.4, 32]}
          position={[0, 0.2, 0]}
          material={buttonMaterial}
        />

        <CylinderCollider
          name={endName}
          args={[4, 18]}
          position={[0, 2, 0]}
          sensor={true}
        />
      </group>
    </group>
  );
}

export const endName = "end";
