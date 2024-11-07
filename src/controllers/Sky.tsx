import { animated, useSpring } from "@react-spring/three";
import { useContext, useMemo } from "react";
import { transitionDuration } from "../scenes/CameraControlAnimation";
import { ControllerContext } from "./ControllerContext";
import { Vortex } from "./Vortex";
import { useCurrentLevel } from "./useCurrentLevel";

export function Sky() {
  const { items } = useContext(ControllerContext);

  const level = useCurrentLevel();

  const inputY = useMemo(
    () =>
      items
        .filter((item) => item.level < level)
        .map((item) => item.start.stageHeight)
        .reduce((a, b) => a + b, 0),
    [items, level]
  );

  const { y: outputY } = useSpring({
    y: inputY,
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
