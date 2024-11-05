import { useContext, useMemo } from "react";
import { SlotContext } from "../../controllers/SlotContext";
import { GroundButton } from "../stageA/GroundButton";
import { GroundBox } from "./GroundBox";

export function Ground() {
  const boxSize = 200;

  const { item } = useContext(SlotContext);
  const { blocks } = item.build;

  const boxes = useMemo(() => {
    const xPositive = Math.min(
      Math.ceil(
        Math.max(...blocks.map((block) => block.position.x + 20), boxSize) /
          boxSize
      ),
      6
    );
    const xNegative = Math.min(
      Math.ceil(
        Math.max(...blocks.map((block) => -block.position.x + 20), boxSize) /
          boxSize
      ),
      6
    );

    const zPositive = Math.min(
      Math.ceil(
        Math.max(...blocks.map((block) => block.position.z + 20), boxSize * 2) /
          boxSize
      ),
      7
    );
    const zNegative = Math.min(
      Math.ceil(
        Math.max(
          ...blocks.map((block) => -block.position.z + 20),
          boxSize * 2
        ) / boxSize
      ),
      7
    );

    const plates = [];

    for (let x = -xNegative; x <= xPositive; x++) {
      if (x !== 0) {
        for (let z = -zNegative; z <= zPositive; z++) {
          if (z !== 0) {
            plates.push({
              x: (x - (x > 0 ? 0.5 : -0.5)) * boxSize,
              z: (z - (z > 0 ? 0.5 : -0.5)) * boxSize,
            });
          }
        }
      }
    }

    return plates;
  }, [blocks]);

  return (
    <>
      {boxes.map(({ x, z }) => (
        <GroundBox
          key={`${x}, ${z}`}
          width={boxSize}
          depth={boxSize}
          x={x}
          z={z}
        />
      ))}

      <GroundButton position={[0, 0, 350]} size={20} />
      <GroundButton position={[0, 0, -350]} size={20} />
    </>
  );
}
