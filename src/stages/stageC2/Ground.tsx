import { GroundButton } from "../stageA/GroundButton";
import { GroundBox } from "../stageB5/GroundBox";

export function Ground() {
  return (
    <>
      <GroundBox width={500} height={650} />

      <GroundButton position={[-100, 0, 250]} size={20} />
      <GroundButton position={[0, 0, 300]} size={20} />
    </>
  );
}
