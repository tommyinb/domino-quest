import { BridgeContent } from "../../blocks/BridgeContent";

export function PreviewBridge() {
  return (
    <group position={[0, -20, -40]} rotation={[0, Math.PI * 0.5, 0]}>
      <BridgeContent length={90} />
    </group>
  );
}
