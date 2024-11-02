import { Fragment } from "react/jsx-runtime";
import { Vector3Tuple } from "three";
import { GroundBridge } from "../stageA/GroundBridge";
import { GroundDisk } from "../stageA/GroundDisk";
import { GroundStation } from "../stageA/GroundStation";

export function Ground({ stationPositions }: Props) {
  return (
    <>
      <GroundStation
        position={stationPositions[0]}
        diskSize={40}
        buttonSize={20}
      />

      {stationPositions.slice(1).map((position, index) => (
        <Fragment key={index}>
          <GroundBridge
            fromPosition={stationPositions[index]}
            toPosition={position}
          />

          <GroundDisk position={position} size={30} />
        </Fragment>
      ))}

      <GroundBridge
        fromPosition={stationPositions[stationPositions.length - 2]}
        toPosition={stationPositions[stationPositions.length - 1]}
      />

      <GroundStation
        position={stationPositions[stationPositions.length - 1]}
        diskSize={40}
        buttonSize={20}
      />
    </>
  );
}

interface Props {
  stationPositions: Vector3Tuple[];
}
