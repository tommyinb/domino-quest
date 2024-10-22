import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Color, MeshPhongMaterial } from "three";
import { useBuilt } from "../../dominos/useBuilt";

export function useButtonMaterial() {
  const material = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xffe66d);
    material.flatShading = true;
    return material;
  }, []);

  const built = useBuilt();
  const color = useMemo(() => new Color(built ? 0xef7a85 : 0xffe66d), [built]);
  useFrame(() => material.color.lerp(color, 0.1));

  return material;
}
