import { animated, useSpring } from "@react-spring/three";
import { useContext } from "react";
import { transitionDuration } from "./CameraControl";
import { ControllerContext } from "./ControllerContext";
import { slotHeight } from "./Slot";
import { Vortex } from "./Vortex";

export function Sky() {
  const { currentIndex } = useContext(ControllerContext);

  const { y } = useSpring({
    y: currentIndex * slotHeight,
    config: { duration: transitionDuration },
  });

  return (
    <animated.group position-y={y}>
      <Vortex positionZ={300} speed={0.2} />
      <Vortex positionZ={100} speed={-0.1} />
      <Vortex positionZ={-100} speed={0.1} />
      <Vortex positionZ={-300} speed={-0.2} />
    </animated.group>
  );
}
