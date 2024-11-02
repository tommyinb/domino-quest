export function getPathParameters() {
  const centerX = 130;

  const pointY = centerX * 0.5;

  const delta = Math.pow(centerX, 2) - 4 * Math.pow(pointY, 2);
  if (delta < 0) {
    throw new Error(`invalid delta ${delta}`);
  }

  const pointX = (centerX + Math.sqrt(delta)) / 2;

  const radius = Math.sqrt(Math.pow(centerX - pointX, 2) + Math.pow(pointY, 2));

  return {
    centerX,
    pointX,
    pointY,
    radius,
  };
}
