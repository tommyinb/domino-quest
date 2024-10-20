import { Fragment } from "react/jsx-runtime";
import { Vector3Tuple } from "three";
import { GroundBridge } from "../stage1/GroundBridge";
import { GroundDisk } from "../stage1/GroundDisk";
import { GroundStation } from "../stage1/GroundStation";

export function Ground({ stationPositions: positions }: Props) {
  return (
    <>
      <GroundStation position={positions[0]} />

      {positions.slice(1).map((position, index) => (
        <Fragment key={index}>
          <GroundBridge fromPosition={positions[index]} toPosition={position} />

          <GroundDisk position={position} size={30} />
        </Fragment>
      ))}

      <GroundBridge
        fromPosition={positions[positions.length - 2]}
        toPosition={positions[positions.length - 1]}
      />

      <GroundStation position={positions[positions.length - 1]} />
    </>
  );
}

interface Props {
  stationPositions: Vector3Tuple[];
}
