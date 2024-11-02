import { GroundBridge } from "./GroundBridge";
import { GroundStation } from "./GroundStation";
import { endPosition, startPosition } from "./start";

export function Ground() {
  return (
    <>
      <GroundStation position={startPosition} diskSize={40} buttonSize={20} />

      <GroundBridge fromPosition={startPosition} toPosition={endPosition} />

      <GroundStation position={endPosition} diskSize={40} buttonSize={20} />
    </>
  );
}
