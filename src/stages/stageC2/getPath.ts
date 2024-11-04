import { Vector3 } from "three";
import { getPathArc } from "./getPathArc";
import { getPathLine } from "./getPathLine";

export function getPath() {
  const points: Vector3[] = [];

  let z = 250;
  points.push(...getPathLine(new Vector3(-90, 0, z), new Vector3(0, 0, z)));

  const radius1 = 28.97777479;

  for (let i = 0; i < 4; i++) {
    const x = 70 + i * 20;
    points.push(...getPathLine(new Vector3(0, 0, z), new Vector3(x, 0, z)));

    z -= radius1;
    points.push(
      ...getPathArc(new Vector3(x, 0, z), 25, Math.PI * 0.5, -Math.PI * 0.5)
    );

    z -= radius1;
    points.push(...getPathLine(new Vector3(x, 0, z), new Vector3(-x, 0, z)));

    z -= radius1;
    points.push(
      ...getPathArc(new Vector3(-x, 0, z), 25, Math.PI * 0.5, Math.PI * 1.5)
    );

    z -= radius1;
    points.push(...getPathLine(new Vector3(-x, 0, z), new Vector3(0, 0, z)));
  }

  points.push(...getPathLine(new Vector3(-130, 0, z), new Vector3(150, 0, z)));

  const radius2 = 47.94339916;

  z -= radius2;
  points.push(
    ...getPathArc(
      new Vector3(150, 0, z),
      radius2,
      Math.PI * 0.5,
      -Math.PI * 0.5
    )
  );

  z -= radius2;
  points.push(
    ...getPathLine(new Vector3(150, 0, z), new Vector3(radius2, 0, z))
  );

  z += radius2;
  points.push(
    ...getPathArc(new Vector3(radius2, 0, z), radius2, Math.PI * 1.5, Math.PI)
  );

  points.push(
    ...getPathLine(new Vector3(0, 0, -z), new Vector3(0, 0, 300)),
    new Vector3(0, 0, 300)
  );

  return points;
}
