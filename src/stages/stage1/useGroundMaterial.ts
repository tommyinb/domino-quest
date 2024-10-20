import { useMemo } from "react";
import { MeshPhongMaterial } from "three";

export function useGroundMaterial() {
  return useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xf7fff7);
    material.flatShading = true;
    return material;
  }, []);
}
