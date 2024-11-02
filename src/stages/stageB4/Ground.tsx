import { GroundButton } from "../stageA/GroundButton";
import { GroundDisk } from "./GroundDisk";
import { endPosition, startPosition } from "./start";

export function Ground() {
  return (
    <>
      <GroundDisk
        position={[0, 0, 0]}
        size={endPosition[2] + buttonSize + 30}
      />

      <GroundButton position={startPosition} size={buttonSize} />

      <GroundButton position={endPosition} size={buttonSize} />
    </>
  );
}

export const buttonSize = 20;
