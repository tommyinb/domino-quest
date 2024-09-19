import { useState } from "react";
import { Vector3 } from "three";
import { Domino } from "./Domino";
import { Next } from "./Next";

export function Build() {
  const [dominos, setDominos] = useState<Vector3[]>(() => [
    new Vector3(0, 0, 20),
  ]);

  return (
    <>
      <Next dominos={dominos} setDominos={setDominos} />

      {dominos.map((position, index) => (
        <Domino key={index} position={position} />
      ))}
    </>
  );
}
