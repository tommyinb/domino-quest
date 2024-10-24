import { GroundBridge } from "../stage1/GroundBridge";
import { GroundDisk } from "../stage1/GroundDisk";
import { GroundStation } from "../stage1/GroundStation";
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
