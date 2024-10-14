import { Physics } from "@react-three/rapier";
import { useContext, useEffect } from "react";
import { Vector3 } from "three";
import { SceneContext } from "../scenes/SceneContext";
import { Domino } from "./Domino";
import { Ground } from "./Ground";
import { Next } from "./Next";
import { StageContext } from "./StageContext";
import { StageState } from "./stageState";

export function Stage() {
  const { debug } = useContext(SceneContext);

  const { state, dominos, setDominos } = useContext(StageContext);
  useEffect(() => setDominos([new Vector3(0, 0, 75)]), [setDominos]);

  return (
    <Physics debug={debug} gravity={[0, -400, 0]}>
      <Ground />

      {state === StageState.Building && <Next />}

      {dominos.map((position, index) => (
        <Domino key={index} position={position} />
      ))}
    </Physics>
  );
}
