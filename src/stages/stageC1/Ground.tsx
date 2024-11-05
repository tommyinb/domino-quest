import { useMemo } from "react";
import { GroundButton } from "../stageA/GroundButton";
import { GroundDisk } from "../stageB4/GroundDisk";
import { getPathParameters } from "./getPathParameters";

export function Ground() {
  const { centerX, pointX, pointY } = useMemo(getPathParameters, []);

  return (
    <>
      <GroundDisk position={[centerX, 0, 0]} size={centerX + 10} />
      <GroundDisk position={[-centerX, 0, 0]} size={centerX + 10} />

      <GroundButton position={[-pointX, 0, -pointY]} />
    </>
  );
}
