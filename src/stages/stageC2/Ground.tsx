import { GroundButton } from "../stageA/GroundButton";
import { GroundBox } from "../stageB5/GroundBox";

export function Ground() {
  return (
    <>
      <GroundBox width={500} height={680} />

      <GroundButton position={[-90, 0, 250]} />
      <GroundButton position={[0, 0, 300]} />
    </>
  );
}
