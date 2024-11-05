import { useCallback, useMemo, useState } from "react";

export function useSteering(steeringSizes: number[]) {
  const [steeringStep, setSteeringStep] = useState(0);

  const steeringSize = useMemo(() => {
    if (steeringStep === 0) {
      return 0;
    } else {
      return steeringSizes[(Math.abs(steeringStep) - 1) % steeringSizes.length];
    }
  }, [steeringSizes, steeringStep]);

  const steeringAngle = useMemo(
    () =>
      steeringSize > 0 ? Math.sign(steeringStep) * (Math.PI / steeringSize) : 0,
    [steeringSize, steeringStep]
  );

  const steer = useCallback(
    (side: number) =>
      setSteeringStep((steering) =>
        Math.min(
          Math.max(steering + side, -steeringSizes.length),
          steeringSizes.length
        )
      ),
    [steeringSizes.length]
  );

  return {
    steeringSize,
    steeringAngle,
    steer,
  };
}
