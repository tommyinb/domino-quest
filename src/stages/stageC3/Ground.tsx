import { useMemo } from "react";
import { GroundButton } from "../stageA/GroundButton";
import { GroundDisk } from "../stageB4/GroundDisk";
import { getStations } from "./getStations";

export function Ground() {
  const { start, end } = useMemo(getStations, []);

  return (
    <>
      <GroundDisk position={[0, 0, 0]} size={560} />

      <GroundButton position={start} />
      <GroundButton position={end} />
    </>
  );
}
