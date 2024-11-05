import { GroundBridge } from "./GroundBridge";
import { GroundStation } from "./GroundStation";
import { endPosition, startPosition } from "./start";

export function Ground() {
  return (
    <>
      <GroundStation position={startPosition} />

      <GroundBridge fromPosition={startPosition} toPosition={endPosition} />

      <GroundStation position={endPosition} />
    </>
  );
}
