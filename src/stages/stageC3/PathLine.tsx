import { Line } from "@react-three/drei";
import { useContext, useMemo } from "react";
import { Vector3 } from "three";
import { useBuilt } from "../../blocks/useBuilt";
import { SlotContext } from "../../controllers/SlotContext";
import { PlayContext } from "../PlayContext";

export function PathLine({ from, to }: Props) {
  const allPoints = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => from.clone().lerp(to, i / 20)),
    [from, to]
  );

  const { item } = useContext(SlotContext);
  const { blocks } = item.build;
  const targets = useMemo(
    () =>
      allPoints.map((point) => {
        const pairs = blocks
          .map((block, index) => ({ block, index }))
          .filter((pair) => {
            const distance = new Vector3(
              pair.block.position.x,
              point.y,
              pair.block.position.z
            ).distanceTo(point);

            return distance <= 20;
          });

        return {
          point,
          pairs,
        };
      }),
    [allPoints, blocks]
  );

  const { tippeds } = useContext(PlayContext);
  const segments = useMemo(() => {
    const segments: { points: Vector3[] }[] = [];
    let points: Vector3[] = [];

    targets.forEach((target) => {
      const passed = target.pairs
        .map((pair) => pair.index)
        .some((index) => tippeds[index]);

      if (passed) {
        points.push(target.point);
      } else {
        if (points.length > 0) {
          segments.push({ points });
          points = [];
        }
      }
    });

    if (points.length > 0) {
      segments.push({ points });
    }

    return segments;
  }, [targets, tippeds]);

  const built = useBuilt();

  return (
    <>
      <Line
        points={allPoints}
        position={[0, 0.5, 0]}
        color={0xf7fff7}
        dashed={true}
        dashScale={0.15}
        lineWidth={4}
      />

      {segments.map((segment, index) => (
        <Line
          key={index}
          points={segment.points}
          position={[0, 0.6, 0]}
          color={built ? 0xef7a85 : 0xffe66d}
          dashed={true}
          dashScale={0.15}
          lineWidth={4}
        />
      ))}
    </>
  );
}

interface Props {
  from: Vector3;
  to: Vector3;
}
