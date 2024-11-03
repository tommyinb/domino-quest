import { BridgeModel, stepHeight } from "../../blocks/BridgeModel";

export function PreviewBridge() {
  const totalHeight = stepHeight * 4;

  return (
    <group
      position={[0, -totalHeight / 2, -60]}
      rotation={[0, Math.PI * 0.5, 0]}
    >
      <BridgeModel length={120} opacity={1} />
    </group>
  );
}
