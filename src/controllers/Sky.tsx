import { animated, useSpring } from "@react-spring/three";
import { useContext, useMemo } from "react";
import { transitionDuration } from "../scenes/CameraControlAnimation";
import { ControllerContext } from "./ControllerContext";
import { Vortex } from "./Vortex";

export function Sky() {
  const { items, currentLevel } = useContext(ControllerContext);

  const levelY = useMemo(
    () =>
      items
        .filter((item) => item.level < currentLevel)
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
    [currentLevel, items]
  );

  const { y: outputY } = useSpring({
    y: levelY,
    config: { duration: transitionDuration },
  });

  return (
    <animated.group position-y={outputY}>
      {useMemo(
        () => (
          <>
            <Vortex positionZ={300} speed={0.2} />
            <Vortex positionZ={100} speed={-0.1} />
            <Vortex positionZ={-100} speed={0.1} />
            <Vortex positionZ={-300} speed={-0.2} />
          </>
        ),
        []
      )}
    </animated.group>
  );
}
