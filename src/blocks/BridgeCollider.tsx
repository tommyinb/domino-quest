import { CuboidCollider } from "@react-three/rapier";
import { boardThickness, stepDepth, stepHeight } from "./BridgeModel";
import { width } from "./FollowDomino";

export function BridgeCollider({ length }: Props) {
  const stairDepth = stepDepth * 3;
  const bridgeGap = length - stairDepth * 2 - boardThickness * 2;

  const totalHeight = stepHeight * 4;

  return (
    <>
      <CuboidCollider
        args={[width / 2, boardThickness / 2, bridgeGap / 2]}
        position={[0, totalHeight - boardThickness / 2, 0]}
      />

      <CuboidCollider
        args={[width / 2, totalHeight / 2, boardThickness / 2]}
        position={[0, totalHeight / 2, -(bridgeGap / 2 + boardThickness / 2)]}
      />

      <CuboidCollider
        args={[width / 2, stepHeight / 2, stepDepth / 2]}
        position={[0, stepHeight / 2, -(length / 2 - stepDepth * 0.5)]}
      />

      <CuboidCollider
        args={[width / 2, (stepHeight * 2) / 2, stepDepth / 2]}
        position={[0, (stepHeight * 2) / 2, -(length / 2 - stepDepth * 1.5)]}
      />

      <CuboidCollider
        args={[width / 2, (stepHeight * 3) / 2, stepDepth / 2]}
        position={[0, (stepHeight * 3) / 2, -(length / 2 - stepDepth * 2.5)]}
      />

      <CuboidCollider
        args={[width / 2, totalHeight / 2, boardThickness / 2]}
        position={[0, totalHeight / 2, bridgeGap / 2 + boardThickness / 2]}
      />

      <CuboidCollider
        args={[width / 2, stepHeight / 2, stepDepth / 2]}
        position={[0, stepHeight / 2, length / 2 - stepDepth * 0.5]}
      />

      <CuboidCollider
        args={[width / 2, (stepHeight * 2) / 2, stepDepth / 2]}
        position={[0, (stepHeight * 2) / 2, length / 2 - stepDepth * 1.5]}
      />

      <CuboidCollider
        args={[width / 2, (stepHeight * 3) / 2, stepDepth / 2]}
        position={[0, (stepHeight * 3) / 2, length / 2 - stepDepth * 2.5]}
      />
    </>
  );
}

interface Props {
  length: number;
}
