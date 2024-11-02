import { GroundBridge } from "../stageA/GroundBridge";
import { GroundDisk } from "../stageA/GroundDisk";
import { GroundStation } from "../stageA/GroundStation";
import { endPosition, middlePosition, startPosition } from "./start";

export function Ground() {
  return (
    <>
      <GroundStation position={startPosition} diskSize={40} buttonSize={20} />

      <GroundBridge fromPosition={startPosition} toPosition={middlePosition} />

      <GroundDisk position={middlePosition} size={30} />

      <GroundBridge fromPosition={middlePosition} toPosition={endPosition} />

      <GroundStation position={endPosition} diskSize={40} buttonSize={20} />
    </>
  );
}
