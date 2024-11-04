import { Vector3 } from "three";

export function getPath() {
  const parts: Array<ReturnType<typeof getLine>> = [];

  let z = 250;
  parts.push(getLine(new Vector3(-90, 0, z), new Vector3(0, 0, z)));

  const radius1 = 28.97777479;

  for (let i = 0; i < 4; i++) {
    const x = 70 + i * 20;
    parts.push(getLine(new Vector3(0, 0, z), new Vector3(x, 0, z)));

    z -= radius1;
    parts.push(
      getTurn(new Vector3(x, 0, z), 25, Math.PI * 0.5, -Math.PI * 0.5)
    );

    z -= radius1;
    parts.push(getLine(new Vector3(x, 0, z), new Vector3(-x, 0, z)));

    z -= radius1;
    parts.push(
      getTurn(new Vector3(-x, 0, z), 25, Math.PI * 0.5, Math.PI * 1.5)
    );

    z -= radius1;
    parts.push(getLine(new Vector3(-x, 0, z), new Vector3(0, 0, z)));
  }

  parts.push(getLine(new Vector3(-130, 0, z), new Vector3(150, 0, z)));

  const radius2 = 47.94339916;

  z -= radius2;
  parts.push(
    getTurn(new Vector3(150, 0, z), radius2, Math.PI * 0.5, -Math.PI * 0.5)
  );

  z -= radius2;
  parts.push(getLine(new Vector3(150, 0, z), new Vector3(radius2, 0, z)));

  z += radius2;
  parts.push(
    getTurn(new Vector3(radius2, 0, z), radius2, Math.PI * 1.5, Math.PI)
  );

  parts.push(getLine(new Vector3(0, 0, -z), new Vector3(0, 0, 300)), [
    new Vector3(0, 0, 300),
  ]);

  return parts.flatMap((part) => part);
}

function getLine(from: Vector3, to: Vector3) {
  const steps = Math.floor(from.distanceTo(to) / 15);

  return Array.from({ length: steps }).map((_, i) =>
    from.clone().lerp(to, i / steps)
  );
}

function getTurn(
  center: Vector3,
  radius: number,
  fromAngle: number,
  toAngle: number
) {
  const steps = Math.floor((Math.PI * 2 * radius) / 15);

  return Array.from({ length: steps }).map((_, i) => {
    const angle = fromAngle + (toAngle - fromAngle) * (i / steps);

    return new Vector3(
      center.x + radius * Math.cos(angle),
      0,
      center.z + radius * Math.sin(angle)
    );
  });
}
