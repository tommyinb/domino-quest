import { Vector3 } from "three";

export function getPath() {
  const parts: Array<ReturnType<typeof getLine>> = [];

  parts.push(getLine(new Vector3(-100, 0, 250), new Vector3(-70, 0, 250)));

  for (let i = 0; i < 4; i++) {
    const x = 70 + i * 20;
    const z = 250 - i * 100;

    parts.push(
      getLine(new Vector3(-x, 0, z), new Vector3(x, 0, z)),
      getTurn(new Vector3(x, 0, z - 25), 25, Math.PI * 0.5, -Math.PI * 0.5),
      getLine(new Vector3(x, 0, z - 50), new Vector3(-x, 0, z - 50)),
      getTurn(new Vector3(-x, 0, z - 75), 25, Math.PI * 0.5, Math.PI * 1.5)
    );
  }

  parts.push(
    getLine(new Vector3(-150, 0, -125 - 25), new Vector3(150, 0, -125 - 25)),
    getTurn(new Vector3(150, 0, -125 - 50), 25, Math.PI * 0.5, -Math.PI * 0.5),
    getLine(new Vector3(150, 0, -125 - 75), new Vector3(-150, 0, -125 - 75))
  );

  parts.push(
    getTurn(new Vector3(-170, 0, -250), 50, Math.PI * 0.5, Math.PI * 1.5),
    getLine(new Vector3(-170, 0, -300), new Vector3(-50, 0, -300)),
    getTurn(new Vector3(-50, 0, -250), 50, Math.PI * 1.5, Math.PI * 2)
  );

  parts.push(getLine(new Vector3(0, 0, -250), new Vector3(0, 0, 300)), [
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
