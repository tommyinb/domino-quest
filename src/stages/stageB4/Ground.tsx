import { GroundButton, size } from "../stageA/GroundButton";
import { GroundDisk } from "./GroundDisk";
import { endPosition, startPosition } from "./start";

export function Ground() {
  return (
    <>
      <GroundDisk position={[0, 0, 0]} size={endPosition[2] + size + 30} />

      <GroundButton position={startPosition} />

      <GroundButton position={endPosition} />
    </>
  );
}
