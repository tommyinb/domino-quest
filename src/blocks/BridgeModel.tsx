import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Mesh, MeshPhongMaterial } from "three";
import { width } from "./FollowDomino";
import bridgeModel from "./bridgeModel.glb";

useGLTF.preload(bridgeModel);

export function BridgeModel({ length, opacity }: Props) {
  const model = useGLTF<string>(bridgeModel);

  const material = useMemo(() => {
    const material = new MeshPhongMaterial();
    material.color.set(0xffafcc);
    material.flatShading = true;

    if (opacity < 1) {
      material.transparent = true;
      material.opacity = opacity;
    }

    return material;
  }, [opacity]);

  const scene = useMemo(() => {
    const scene = model.scene.clone(true);

    const totalHeight = stepHeight * 4;

    const stairDepth = stepDepth * 3;
    const bridgeGap = length - stairDepth * 2 - boardThickness * 2;

    const center = scene.children.find(
      (child) => child.name === "center"
    ) as Mesh;
    center.position.set(0, totalHeight, 0);
    center.scale.set(width, boardThickness, bridgeGap);
    center.material = material;

    const leftCap = scene.children.find(
      (child) => child.name === "leftCap"
    ) as Mesh;
    leftCap.position.set(0, totalHeight, -bridgeGap / 2);
    leftCap.scale.set(width, boardThickness, boardThickness);
    leftCap.material = material;

    const stairHeight = stepHeight * 3;

    const leftNeck = scene.children.find(
      (child) => child.name === "leftNeck"
    ) as Mesh;
    leftNeck.position.set(0, stairHeight, -bridgeGap / 2);
    leftNeck.scale.set(
      width,
      totalHeight - boardThickness - stairHeight,
      boardThickness
    );
    leftNeck.material = material;

    const leftLeg = scene.children.find(
      (child) => child.name === "leftLeg"
    ) as Mesh;
    leftLeg.position.set(0, 0, -bridgeGap / 2);
    leftLeg.scale.set(width, stairHeight, boardThickness);
    leftLeg.material = material;

    const leftStair = scene.children.find(
      (child) => child.name === "leftStair"
    ) as Mesh;
    leftStair.position.set(0, 0, -(length / 2 - stairDepth));
    leftStair.scale.set(width, stairHeight, stairDepth);
    leftStair.material = material;

    const rightCap = scene.children.find(
      (child) => child.name === "rightCap"
    ) as Mesh;
    rightCap.position.set(0, totalHeight, bridgeGap / 2);
    rightCap.scale.set(width, boardThickness, boardThickness);
    rightCap.material = material;

    const rightNeck = scene.children.find(
      (child) => child.name === "rightNeck"
    ) as Mesh;
    rightNeck.position.set(0, stairHeight, bridgeGap / 2);
    rightNeck.scale.set(
      width,
      totalHeight - boardThickness - stairHeight,
      boardThickness
    );
    rightNeck.material = material;

    const rightLeg = scene.children.find(
      (child) => child.name === "rightLeg"
    ) as Mesh;
    rightLeg.position.set(0, 0, bridgeGap / 2);
    rightLeg.scale.set(width, stairHeight, boardThickness);
    rightLeg.material = material;

    const rightStair = scene.children.find(
      (child) => child.name === "rightStair"
    ) as Mesh;
    rightStair.position.set(0, 0, length / 2 - stairDepth);
    rightStair.scale.set(width, stairHeight, stairDepth);
    rightStair.material = material;

    return scene;
  }, [length, material, model.scene]);

  return <primitive object={scene} />;
}

interface Props {
  length: number;
  opacity: number;
}

export const stepDepth = 13;
export const stepHeight = 10;
export const boardThickness = 5;
